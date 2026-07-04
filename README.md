# Todo API

A full-stack task management application with a modern, beautiful UI. Built with a React/Next.js frontend and Express/TypeScript backend with PostgreSQL database.

---

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose (for database)
- npm or pnpm package manager

### Database Setup with Docker

1. **Create environment file for Docker:**
   ```bash
   cp .env.docker.example .env.docker
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
   cd backend
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```

3. **Generate Prisma client:**
   ```bash
   npm run prisma:generate
   ```

4. **Run database migrations:**
   ```bash
   npm run prisma:migrate
   ```

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env.local
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on http://localhost:5000

2. **Start the frontend dev server:**
   ```bash
   cd frontend
   npm run dev
   ```
   App runs on http://localhost:3000

3. **Open your browser:**
   Navigate to http://localhost:3000

### Manual PostgreSQL Setup (Alternative)

If you prefer to use a local PostgreSQL installation instead of Docker:

1. **Create a database:**
   ```sql
   CREATE DATABASE todo_db;
   ```

2. **Update backend `.env`:**
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_db"
   SESSION_SECRET="your-secret-key-here"
   ```

3. **Continue with backend and frontend setup as described above**

If you prefer to use a local PostgreSQL installation:

1. **Create a database:**
   ```sql
   CREATE DATABASE todo_db;
   ```

2. **Update backend `.env`:**
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_db"
   SESSION_SECRET="your-secret-key-here"
   ```

3. **Continue with installation:**
   ```bash
   cd backend
   npm install
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   ```

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bshongwe/todo-api.git
   cd todo-api
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your DB credentials and SESSION_SECRET
   npm run prisma:generate
   npm run prisma:migrate
   ```

3. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   # Update NEXT_PUBLIC_API_URL if needed
   ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on http://localhost:5000

2. **Start the frontend dev server:**
   ```bash
   cd frontend
   npm run dev
   ```
   App runs on http://localhost:3000

3. **Open your browser:**
   Navigate to http://localhost:3000

---

## Documentation

- **[Backend Documentation](./backend/README.md)** - API setup, endpoints, and database schema
- **[Frontend Documentation](./frontend/README.md)** - UI components, features, and development guide

---

## Tech Stack

### Backend
- **Framework**: Express.js 5
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Session-based with express-session
- **Validation**: Zod
- **Security**: Helmet, CORS, bcrypt

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Theme**: next-themes
- **State**: React Context API

---

## Security Features

- Session regeneration on login (prevents fixation)
- Password hashing with bcrypt (12 rounds)
- SQL injection prevention (Prisma ORM)
- XSS protection (Helmet)
- CORS configuration
- Input validation with Zod
- Unique constraint handling

---

## Database Schema

- **User**: id, email, name, passwordHash, timestamps
- **Session**: id, userId, expiresAt, timestamps
- **Todo**: id, title, description, completed, priority, dueDate, userId, timestamps

---

## Build

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC

## 👨‍💻 Author

**[Ernest B. Shongwe](https://github.com/bshongwe)**

---

**Note**: Make sure to configure your environment variables before running the application. See the backend and frontend README files for detailed setup instructions.