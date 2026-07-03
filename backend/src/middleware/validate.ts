import { Priority as PrismaPriority } from '@prisma/client';
import { z } from 'zod';

const priorityValues = Object.values(PrismaPriority) as [string, ...string[]];

export const todoSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  priority: z.enum(priorityValues).optional(),
  dueDate: z.string().optional().transform((value) => (value ? new Date(value) : undefined)),
});

export const todoQuerySchema = z.object({
  completed: z.enum(['true', 'false']).transform((value) => value === 'true').optional(),
  priority: z.enum(priorityValues).optional(),
  dueDate: z.iso.datetime().transform((value) => new Date(value)).optional(),
});

export const todoUpdateSchema = todoSchema.partial();