import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { ZodError } from 'zod';
import todoRoutes from './routes/todoRoutes.js';
import { AppError } from './utils/errorHandler.js';

const app = express();

app.use(helmet());
const allowedOrigins = new Set(['http://localhost:3000', 'http://localhost:5173']);

app.use(
	cors({
		origin(origin, callback) {
			if (!origin || allowedOrigins.has(origin)) {
				callback(null, true);
				return;
			}

			callback(new AppError(403, 'Not allowed by CORS'));
		},
	}),
);
app.use(express.json());
app.use(morgan('dev'));

app.use(
	'/api/todos',
	(req: Request, _res: Response, next: NextFunction) => {
		const userId = req.header('x-user-id');
		const email = req.header('x-user-email');

		if (!userId || !email) {
			next(new AppError(401, 'Unauthorized'));
			return;
		}

		req.user = { id: userId, email };
		next();
	},
	todoRoutes,
);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	if (err instanceof AppError) {
		res.status(err.statusCode).json({ message: err.message });
		return;
	}

	if (err instanceof ZodError) {
		res.status(400).json({
			message: 'Validation failed',
			errors: err.issues.map((issue) => ({
				path: issue.path,
				message: issue.message,
			})),
		});
		return;
	}

	console.error(err);
	res.status(500).json({ message: 'Internal Server Error' });
};

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));