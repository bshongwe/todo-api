import type { Request, Response } from 'express';
import { todoService } from '../services/todoService.js';
import { AppError, asyncHandler } from '../utils/errorHandler.js';
import { todoSchema, todoUpdateSchema } from '../middleware/validate.js';

export const todoController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    const validated = todoSchema.parse(req.body);
    const todo = await todoService.createTodo(validated, req.user!.id); // <<assume>> auth middleware
    res.status(201).json(todo);
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    const todos = await todoService.getTodos(req.user!.id, req.query);
    res.json(todos);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const todoId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!todoId) throw new AppError(400, 'Todo id is required');

    const todo = await todoService.getTodoById(todoId, req.user!.id);
    res.json(todo);
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const todoId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!todoId) throw new AppError(400, 'Todo id is required');

    const validated = todoUpdateSchema.parse(req.body);
    const todo = await todoService.updateTodo(todoId, req.user!.id, validated);
    res.json(todo);
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const todoId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!todoId) throw new AppError(400, 'Todo id is required');

    await todoService.deleteTodo(todoId, req.user!.id);
    res.status(204).send();
  }),

};