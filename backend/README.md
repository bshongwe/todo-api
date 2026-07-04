# TODO API Server

Express.js backend API with TypeScript, Prisma ORM, and PostgreSQL database.

## Features

- Secure session-based authentication
- Session regeneration (prevents fixation attacks)
- Password hashing with bcrypt (12 rounds)
- Input validation with Zod
- Security middleware (Helmet, CORS)
- PostgreSQL database with Prisma ORM
- User-specific data isolation
- Optimistic error handling
- Advanced todo filtering
- RESTful API design

---

## Tech Stack

- **Framework**: Express.js 5
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma 7
- **Authentication**: express-session
- **Validation**: Zod 4
- **Security**: Helmet, CORS, bcrypt

---

## Installation

### Database Setup with Docker

1. **From the project root, create Docker environment file:**
   ```bash
   cp ../.env.docker.example ../.env.docker
   ```

2. **Start PostgreSQL:**
   ```bash
   docker-compose up -d
   ```

3. **Verify database is running:**
   ```bash
   docker-compose ps
   ```

### Backend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/todo_db"
   SESSION_SECRET="your-secret-key-here"
   PORT=5000
   NODE_ENV=development
   ```

3. **Generate Prisma client:**
   ```bash
   npm run prisma:generate
   ```

4. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```

---

## Running the Server

### Development
```bash
npm run dev
```
Server starts on http://localhost:5000

### Production
```bash
npm run build
npm start
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Todos (Authenticated)
- `GET /api/todos` - Get all todos (with filters)
- `GET /api/todos/:id` - Get specific todo
- `POST /api/todos` - Create new todo
- `PATCH /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

---

## Security Features

### Session Management
- Session regeneration on login prevents fixation attacks
- Sessions stored in database (not memory)
- Automatic session expiration (7 days)
- Session cleanup on logout

### Password Security
- Bcrypt hashing with 12 salt rounds
- Passwords never returned in API responses
- Secure password comparison

### API Security
- Helmet for security headers
- CORS configuration
- Input validation with Zod schemas
- SQL injection prevention (Prisma ORM)
- Error handling without exposing internals

---

## Database Schema

### User
- `id` - UUID primary key
- `email` - Unique email address
- `name` - Optional display name
- `passwordHash` - Bcrypt hashed password
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

### Session
- `id` - UUID primary key
- `userId` - Foreign key to User
- `expiresAt` - Session expiration date
- `createdAt` - Session creation timestamp

### Todo
- `id` - UUID primary key
- `title` - Todo title (required)
- `description` - Optional description
- `completed` - Completion status
- `priority` - LOW, MEDIUM, or HIGH
- `dueDate` - Optional due date
- `userId` - Foreign key to User
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

---

## Filtering

Todos can be filtered by:
- **Status**: `completed=true` or `completed=false`
- **Priority**: `priority=LOW|MEDIUM|HIGH`
- **Due Date**: `dueDate=YYYY-MM-DD`

Example: `GET /api/todos?completed=false&priority=HIGH`

---

## Error Handling

All errors return consistent JSON format:
```json
{
  "message": "Error description"
}
```

Common error codes:
- `400` - Bad request (validation errors)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (insufficient permissions)
- `404` - Not found
- `409` - Conflict (duplicate email)
- `500` - Internal server error

---

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

---

## Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `SESSION_SECRET` | Secret for session encryption | Yes | - |
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment mode | No | development |

### CORS Configuration

Allowed origins (configured in `server.ts`):
- http://localhost:3000
- http://localhost:5173

## Testing

```bash
# Run tests (if configured)
npm test
```

## Dependencies

### Production
- `express` - Web framework
- `@prisma/client` - Database ORM
- `bcrypt` - Password hashing
- `express-session` - Session management
- `helmet` - Security headers
- `cors` - CORS middleware
- `zod` - Schema validation

### Development
- `typescript` - Type checking
- `tsx` - TypeScript execution
- `prisma` - Database toolkit

---

## Contributing

1. Follow TypeScript best practices
2. Use Prisma for all database operations
3. Validate all inputs with Zod schemas
4. Handle errors appropriately
5. Test your changes thoroughly

---

## License

ISC

---

**Note**: Ensure PostgreSQL is running and the database is migrated before starting the server.