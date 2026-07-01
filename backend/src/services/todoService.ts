import { todoRepository } from '../repositories/todoRepository';
import { AppError } from '../utils/errorHandler'; // will import dayi dengz after I connect things

export const todoService = {
  async createTodo(data: any, userId: string) {
    return todoRepository.create(data, userId);
  },
  // ... ng'tofaka other methods later lana
};