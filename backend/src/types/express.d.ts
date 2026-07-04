import 'express-session';

declare module 'express-session' {
  interface SessionData {
    sessionId?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export {};