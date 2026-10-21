const STORAGE_KEY = "daylight-tasks-v1";
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const emptyTitle = document.querySelector("#empty-title");
const emptyMessage = document.querySelector("#empty-message");
const taskTotal = document.querySelector("#task-total");
const allCount = document.querySelector("#all-count");
const clearCompletedButton = document.querySelector("#clear-completed");
const progressFill = document.querySelector("#progress-fill");
const progressTrack = document.querySelector(".progress-track");
const progressPercent = document.querySelector("#progress-percent");
const progressTitle = document.querySelector("#progress-title");
const progressMessage = document.querySelector("#progress-message");
const sectionSubtitle = document.querySelector("#section-subtitle");
const toast = document.querySelector("#toast");
const filters = document.querySelectorAll("[data-filter]");

let tasks = loadTasks();
let currentFilter = "all";
let toastTimer;

function loadTasks() {
  try {
    const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(savedTasks)) {
      throw new TypeError("Saved tasks must be a list.");
    }

    return savedTasks.filter(
      (task) =>
        task &&
        typeof task.id === "string" &&
        typeof task.title === "string" &&
        typeof task.completed === "boolean" &&
        typeof task.createdAt === "string",
    );
  } catch (error) {
    console.error("Unable to load saved tasks.", error);
    showToast("Your saved tasks couldn't be loaded.");
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Unable to save tasks.", error);
    showToast("Your changes couldn't be saved on this device.");
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2800);
}

function formatTaskDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date);
}

function getVisibleTasks() {
  if (currentFilter === "active") {
    return tasks.filter((task) => !task.completed);
  }
  if (currentFilter === "completed") {
    return tasks.filter((task) => task.completed);
  }
  return tasks;
}

function renderTasks() {
  const visibleTasks = getVisibleTasks();
  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;
  const completion = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  taskList.replaceChildren();
  visibleTasks.forEach((task) => {
    const item = document.createElement("article");
    item.className = `task-item${task.completed ? " is-complete" : ""}`;

    const checkButton = document.createElement("button");
    checkButton.className = "task-check";
    checkButton.type = "button";
    checkButton.setAttribute("aria-label", task.completed ? "Mark task as active" : "Mark task as completed");
    checkButton.setAttribute("aria-pressed", String(task.completed));
    checkButton.textContent = "✓";
    checkButton.addEventListener("click", () => toggleTask(task.id));

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const date = document.createElement("span");
    date.className = "task-date";
    date.textContent = formatTaskDate(task.createdAt);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", `Delete task: ${task.title}`);
    deleteButton.textContent = "×";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    item.append(checkButton, title, date, deleteButton);
    taskList.append(item);
  });

  taskTotal.textContent = String(visibleTasks.length);
  allCount.textContent = String(remainingCount);
  clearCompletedButton.hidden = completedCount === 0;
  emptyState.hidden = visibleTasks.length !== 0;

  if (currentFilter === "completed") {
    emptyTitle.textContent = "Nothing completed just yet";
    emptyMessage.textContent = "Finish a task and it’ll show up here. You’ve got this.";
  } else if (currentFilter === "active") {
    emptyTitle.textContent = "You’re all caught up";
    emptyMessage.textContent = "No tasks in progress. Enjoy a little breathing room.";
  } else {
    emptyTitle.textContent = "A little space to begin";
    emptyMessage.textContent = "Add your first task and let the good momentum start.";
  }

  progressFill.style.width = `${completion}%`;
  progressTrack.setAttribute("aria-valuenow", String(completion));
  progressPercent.textContent = `${completion}%`;
  progressTitle.textContent = tasks.length > 0 && remainingCount === 0 ? "Look at you, all done!" : "Your day, your pace";
  progressMessage.textContent =
    tasks.length === 0
      ? "Add a task and make today count."
      : remainingCount === 0
        ? "You made it through your list. Take a well-earned breather."
        : `${remainingCount} ${remainingCount === 1 ? "task" : "tasks"} left. Keep that lovely momentum going.`;
  sectionSubtitle.textContent =
    currentFilter === "all"
      ? "A clear mind starts with a clear list."
      : currentFilter === "active"
        ? "One step at a time is still progress."
        : "Every little win deserves a moment.";
}

function addTask(title) {
  tasks.unshift({
    id: window.crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  });
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (!title) {
    taskInput.focus();
    return;
  }

  addTask(title);
  taskInput.value = "";
  taskInput.focus();
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filters.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-current", isActive ? "page" : "false");
    });
    renderTasks();
  });
});

clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

document.querySelector("#today-button").addEventListener("click", () => {
  const date = new Date();
  document.querySelector("#today-label").textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
});

document.querySelector("#date-label").textContent = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
}).format(new Date()).toUpperCase();

renderTasks();
