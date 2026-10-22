export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  category?: 'Work' | 'Personal' | 'Design' | 'Development' | 'Other';
  createdAt: number;
}

export type FilterType = 'all' | 'pending' | 'completed';
