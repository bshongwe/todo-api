'use client';

import { Moon, Sun, CheckSquare } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-blue-600 text-white group-hover:bg-blue-700 transition-colors duration-200">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Todo App
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/todos"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Todos
            </Link>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={cn(
                'p-2 rounded-lg transition-colors duration-200',
                'text-gray-600 dark:text-gray-400',
                'hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}