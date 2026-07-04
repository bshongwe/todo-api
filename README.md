# Todo API

A full-stack task management application with a modern, beautiful UI. Built with a React/Next.js frontend and Express/TypeScript backend with PostgreSQL database.

---

## Quick Start

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- npm or pnpm package manager

### Installation

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