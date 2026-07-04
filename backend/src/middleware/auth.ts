import type { NextFunction, Request, Response } from 'express';
import prisma from '../config/database.js';
import { AppError } from '../utils/errorHandler.js';

export const requireAuth = async (req: Request, _res: Response, next: NextFunction) => {
  const sessionId = req.session.sessionId;

  if (!sessionId) {
    next(new AppError(401, 'Unauthorized'));
    return;
  }

  const session = await prisma.session.findFirst({
    where: { id: sessionId, expiresAt: { gt: new Date() } },
    include: { user: { select: { id: true, email: true } } },
  });

  if (!session) {
    req.session.destroy(() => {});
    next(new AppError(401, 'Session expired'));
    return;
  }

  req.user = { id: session.user.id, email: session.user.email };
  next();
};
