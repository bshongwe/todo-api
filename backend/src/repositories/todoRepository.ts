import prisma from '../config/database';

export const todoRepository = {
  async create(data: any, userId: string) {
    return prisma.todo.create({ data: { ...data, userId } });
  },

  async findAll(userId: string, filters: any = {}) {
    return prisma.todo.findMany({
      where: { userId, ...filters },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findById(id: string, userId: string) {
    return prisma.todo.findFirst({ where: { id, userId } });
  },

  async update(id: string, userId: string, data: any) {
    return prisma.todo.update({ where: { id, userId }, data });
  },

  async delete(id: string, userId: string) {
    return prisma.todo.delete({ where: { id, userId } });
  },
};