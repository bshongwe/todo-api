export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface CreateTodoDto {
  title: string;
  description?: string;
  completed?: boolean;
  priority?: Priority;
  dueDate?: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: Priority;
  dueDate?: string;
}

export interface TodoQueryParams {
  completed?: boolean;
  priority?: Priority;
  dueDate?: string;
}

export interface ApiError {
  message: string;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
}