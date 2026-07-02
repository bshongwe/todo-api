import { Prisma } from '@prisma/client';
import prisma from '../config/database.js';

type TodoCreateData = Pick<Prisma.TodoUncheckedCreateInput, 'title' | 'description' | 'completed' | 'priority' | 'dueDate'>;
type TodoUpdateData = Pick<Prisma.TodoUpdateInput, 'title' | 'description' | 'completed' | 'priority' | 'dueDate'>;
type TodoListFilters = Pick<Prisma.TodoWhereInput, 'completed' | 'priority' | 'dueDate'>;

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