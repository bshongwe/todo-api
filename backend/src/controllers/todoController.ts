import type { Request, Response, NextFunction } from 'express';
import { todoService } from '../services/todoService';
import { asyncHandler } from '../utils/errorHandler';
import { todoSchema } from '../middleware/validate';

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

};