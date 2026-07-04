# Todo App Frontend

A modern, responsive todo application built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- ✨ Modern UI with dark mode support
- 📱 Fully responsive design
- 🎨 Clean and intuitive interface
- ⚡ Real-time updates
- 🔔 Toast notifications
- 🎯 Priority levels (Low, Medium, High)
- 📅 Due date tracking
- 🔍 Advanced filtering
- ⚙️ Loading skeletons
- 🌓 System-aware theme switching

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Theme**: next-themes
- **Utilities**: clsx, tailwind-merge

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Landing page
│   │   └── todos/
│   │       └── page.tsx        # Todo app page
│   ├── components/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── TodoList.tsx        # Main todo container
│   │   ├── TodoForm.tsx        # Create/edit form
│   │   ├── TodoItem.tsx        # Individual todo display
│   │   ├── LoadingSkeleton.tsx # Loading state
│   │   └── Toast.tsx           # Notification system
│   ├── lib/
│   │   ├── api.ts              # API client
│   │   └── utils.ts            # Utility functions
│   └── types/
│       └── todo.ts             # TypeScript types
├── .env.example                # Environment variables template
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend API running on http://localhost:5000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file:
```bash
cp .env.example .env.local
```

3. Update the API URL in `.env.local` if needed:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

## API Integration

The frontend connects to the backend API at `/api/todos` with the following endpoints:

- `GET /api/todos` - Get all todos (with optional filters)
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Authentication

The app uses demo user credentials:
- User ID: `demo-user`
- Email: `demo@example.com`

These are sent as headers (`x-user-id` and `x-user-email`) with each API request.

## Features Overview

### Creating Todos
- Click "Add Todo" button
- Fill in title (required), description, priority, and due date
- Submit to create

### Editing Todos
- Click the edit icon on any todo
- Modify the fields
- Click "Update Todo" to save

### Completing Todos
- Click the circle/check icon to toggle completion status

### Deleting Todos
- Click the trash icon
- Confirm deletion in the dialog

### Filtering
- Use the filter panel to filter by:
  - Status (All, Active, Completed)
  - Priority (Low, Medium, High)
  - Due Date

### Theme
- Toggle between light and dark mode using the moon/sun icon in the header
- Theme preference is saved in localStorage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC