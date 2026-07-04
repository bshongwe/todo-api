import { Router } from 'express';
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../config/database.js';
import { asyncHandler, AppError } from '../utils/errorHandler.js';
import { registerSchema, loginSchema } from '../middleware/validate.js';

const router = Router();

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const SALT_ROUNDS = 12;

const createSession = async (req: Request, userId: string) => {
  await new Promise<void>((resolve, reject) =>
    req.session.regenerate((err) => (err ? reject(err) : resolve()))
  );
  const session = await prisma.session.create({
    data: { userId, expiresAt: new Date(Date.now() + SESSION_TTL_MS) },
  });
  req.session.sessionId = session.id;
};

// POST /api/auth/register
router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name } = registerSchema.parse(req.body);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new AppError(409, 'Email already in use');

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const user = await prisma.user.create({ data: { email, passwordHash, name: name ?? null } });
    await createSession(req, user.id);
    res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      throw new AppError(409, 'Email already in use');
    }
    throw error;
  }
}));

// POST /api/auth/login
router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new AppError(401, 'Invalid credentials');
  }

  await createSession(req, user.id);
  res.json({ id: user.id, email: user.email, name: user.name });
}));

// POST /api/auth/logout
router.post('/logout', asyncHandler(async (req: Request, res: Response) => {
  const sessionId = req.session.sessionId;
  if (sessionId) await prisma.session.deleteMany({ where: { id: sessionId } });
  req.session.destroy(() => {});
  res.status(204).send();
}));

// GET /api/auth/me
router.get('/me', asyncHandler(async (req: Request, res: Response) => {
  const sessionId = req.session.sessionId;
  if (!sessionId) {
    res.status(401).json({ user: null });
    return;
  }

  const session = await prisma.session.findFirst({
    where: { id: sessionId, expiresAt: { gt: new Date() } },
    include: { user: { select: { id: true, email: true, name: true } } },
  });

  if (!session) {
    req.session.destroy(() => {});
    res.status(401).json({ user: null });
    return;
  }

  res.json(session.user);
}));

export default router;
