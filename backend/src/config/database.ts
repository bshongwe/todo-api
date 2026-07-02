import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error('DATABASE_URL is required');
}

const isDevelopment = process.env.NODE_ENV !== 'production';
const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({
	adapter,
	log: isDevelopment ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
});

export default prisma;