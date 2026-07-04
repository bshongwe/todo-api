import { Priority as PrismaPriority } from '@prisma/client';
import { z } from 'zod';

const priorityValues = Object.values(PrismaPriority) as [PrismaPriority, ...PrismaPriority[]];

export const todoSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  priority: z.enum(priorityValues).optional(),
  dueDate: z.string().date().transform((value) => new Date(value)).optional(),
});

export const todoQuerySchema = z.object({
  completed: z.enum(['true', 'false']).transform((value) => value === 'true').optional(),
  priority: z.enum(priorityValues).optional(),
  dueDate: z.string().date().transform((value) => new Date(value)).optional(),
});

export const todoUpdateSchema = todoSchema.partial();

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(1).max(100).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});