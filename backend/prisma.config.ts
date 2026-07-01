/**
 * The datasource property `url` is no longer supported in schema files.
 * Check Prisma's documentation for more information: https://pris.ly/d/datasource-url.
 * Hence, removed it from schema.prisma
 */
import { defineConfig } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
});