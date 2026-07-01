import { todoRepository } from '../repositories/todoRepository.js';
import { AppError } from '../utils/errorHandler.js'; // will import dayi dengz after I connect things

export const todoService = {
  // POST: /api/todos
  async createTodo(data: any, userId: string) {
    return todoRepository.create(data, userId);
  },
  
  // GET: /api/todos
  async getTodos(userId: string, filters: any = {}) {
    return todoRepository.findAll(userId, filters);
  },
  
  // GET: /api/todos/:id
  async getTodoById(id: string, userId: string) {
    const todo = await todoRepository.findById(id, userId);
    if (!todo) throw new AppError(404, 'Todo not found');
    return todo;
  },

  // UPDATE: /api/todos/:id
  async updateTodo(id: string, userId: string, data: any) {
    await todoService.getTodoById(id, userId);
    return todoRepository.update(id, data);
  },

  // DELETE: /api/todos/:id
  async deleteTodo(id: string, userId: string) {
    await todoService.getTodoById(id, userId);
    return todoRepository.delete(id);
  },
};