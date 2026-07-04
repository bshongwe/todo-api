import { todoRepository } from '../repositories/todoRepository.js';
import { AppError } from '../utils/errorHandler.js';

type CreateData = Parameters<typeof todoRepository.create>[0];
type UpdateData = Parameters<typeof todoRepository.update>[1];
type Filters = Parameters<typeof todoRepository.findAll>[1];

export const todoService = {
  async createTodo(data: CreateData, userId: string) {
    return todoRepository.create(data, userId);
  },

  async getTodos(userId: string, filters: Filters = {}) {
    const where = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== undefined)
    ) as Filters;
    return todoRepository.findAll(userId, where);
  },
  
  async getTodoById(id: string, userId: string) {
    const todo = await todoRepository.findById(id, userId);
    if (!todo) throw new AppError(404, 'Todo not found');
    return todo;
  },

  async updateTodo(id: string, userId: string, data: UpdateData) {
    await todoService.getTodoById(id, userId);
    return todoRepository.update(id, data);
  },

  async deleteTodo(id: string, userId: string) {
    await todoService.getTodoById(id, userId);
    return todoRepository.delete(id);
  },
};