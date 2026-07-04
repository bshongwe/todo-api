import prisma from '../config/database.js';
import type { Priority } from '@prisma/client';

interface TodoCreateData {
  title: string;
  description?: string | null;
  completed?: boolean;
  priority?: Priority;
  dueDate?: Date | null;
}

interface TodoUpdateData {
  title?: string;
  description?: string | null;
  completed?: boolean;
  priority?: Priority;
  dueDate?: Date | null;
}

interface TodoListFilters {
  completed?: boolean;
  priority?: Priority;
  dueDate?: Date;
}

export const todoRepository = {
  async create(data: TodoCreateData, userId: string) {
    return prisma.todo.create({ data: { ...data, userId } });
  },

  async findAll(userId: string, filters: TodoListFilters = {}) {
    return prisma.todo.findMany({
      where: { ...filters, userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findById(id: string, userId: string) {
    return prisma.todo.findFirst({ where: { id, userId } });
  },

  async update(id: string, data: TodoUpdateData) {
    return prisma.todo.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.todo.delete({ where: { id } });
  },
};