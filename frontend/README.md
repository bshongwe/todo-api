# Todo App Frontend

A modern, beautiful todo application built with Next.js 16, TypeScript, and Tailwind CSS v4. Features a stunning violet/purple gradient theme with dark mode support.

---

## Features

- Modern UI inspired by Figma design
- Dark/Light theme toggle with smooth transitions
- Fully responsive design (mobile, tablet, desktop)
- Secure authentication flow
- Create, edit, and delete todos
- Toggle todo completion with animated checkmarks
- Priority levels with color-coded indicators (Low, Medium, High)
- Due date tracking with overdue detection
- Advanced filtering (status, priority, due date)
- Toast notifications for user feedback
- Persistent theme preference
- Real-time UI updates
- Violet/purple gradient theme
- Loading skeletons for better UX
- Glass-morphism effects

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Theme**: next-themes
- **Utilities**: clsx, tailwind-merge
- **HTTP Client**: Custom fetch wrapper

---

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

---

## Running the Client Server

### Development
```bash
npm run dev
```
App runs on http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

---

## Design System

### Color Palette
- **Primary**: Violet to Purple gradients (`from-violet-600 to-purple-600`)
- **Success**: Emerald (`emerald-500`)
- **Warning**: Orange (`orange-500`)
- **Danger**: Rose (`rose-500`)
- **Neutral**: Gray scale

### Typography
- **Font**: Geist Sans (primary), Geist Mono (code)
- **Headings**: Bold with gradient text effects
- **Body**: Regular weight with proper line height

### Components
- **Cards**: Rounded-2xl with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Inputs**: Rounded-xl with violet focus rings
- **Badges**: Pill-shaped with priority colors

---

## Features Overview

### Authentication
- **Login/Register**: Clean form with validation
- **Session Management**: Automatic session handling
- **Protected Routes**: Redirects unauthenticated users
- **User Context**: Global auth state with Context API

### Todo Management
- **Create**: Add new todos with title, description, priority, due date
- **Read**: View all todos with real-time updates
- **Update**: Edit existing todos inline
- **Delete**: Remove with confirmation dialog
- **Toggle**: Mark complete/incomplete with animation

### Filtering System
- **Status Filter**: All, Active, Completed
- **Priority Filter**: Low, Medium, High
- **Due Date Filter**: Date picker
- **Clear All**: Reset all filters at once
- **Active Count**: Shows number of active filters

### Theme System
- **Light Mode**: Clean white background
- **Dark Mode**: Dark gray background
- **Toggle**: Sun/Moon icon in header
- **Persistence**: Saved to localStorage
- **System Preference**: Detects OS theme on first load
- **No Hydration Errors**: Proper SSR handling

---

## Component Details

### Header
- Sticky navigation with backdrop blur
- Logo with gradient icon
- Navigation links (Todos, Logout)
- User display (name or email)
- Theme toggle button
- Responsive design

### TodoItem
- Card-based layout with shadows
- Priority indicator (colored dot)
- Completion toggle with animated checkmark
- Title and description
- Priority and due date badges
- Edit/Delete actions on hover
- Overdue detection with red highlight

### TodoList
- Header with gradient title
- Stats display (active/completed count)
- Add Todo button with gradient
- Error banner for API errors
- Expandable create/edit form
- Filter panel with dropdowns
- Clear filters button
- Empty state with CTA

### TodoForm
- Title input (required)
- Description textarea (optional)
- Priority select dropdown
- Due date picker
- Submit and cancel buttons
- Form validation

---

## API Integration

### Base URL
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Endpoints Used
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create todo
- `PATCH /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Authentication
- Session-based with cookies
- Automatic token refresh
- 401 redirect to login
- Error handling with user feedback

---

## Styling Guidelines

### Tailwind Classes
- Use `cn()` utility for conditional classes
- Prefer gradients for primary actions
- Use rounded-2xl for cards, rounded-xl for inputs
- Add transitions for smooth interactions
- Use dark: prefix for dark mode styles

### Example
```tsx
className={cn(
  'p-5 rounded-2xl shadow-sm transition-all duration-200',
  isActive ? 'bg-violet-50' : 'bg-white',
  'dark:bg-gray-800'
)}
```

---

## Configuration

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

### next-themes Configuration
- **Attribute**: class (adds .dark to HTML)
- **Default Theme**: light
- **System Theme**: Enabled
- **Storage**: localStorage

---

## Development Tips

### Adding New Features
1. Define types in `types/todo.ts`
2. Add API methods in `lib/api.ts`
3. Create/update components
4. Test in both light and dark modes
5. Ensure responsive design

### Debugging
- Check browser console for errors
- Use React DevTools for state inspection
- Verify API calls in Network tab
- Test theme toggle functionality

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Contributing

1. Follow the existing code style
2. Use TypeScript for all new code
3. Test in both light and dark modes
4. Ensure responsive design
5. Update README for new features

## License

ISC

---

**Note**: The backend server must be running for the frontend to work properly. See the main README.md for full project setup instructions.