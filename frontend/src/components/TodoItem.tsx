'use client';

import { CheckCircle2, Circle, Trash2, Edit2, Calendar, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Todo, Priority } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (todo: Todo) => void;
}

const priorityConfig: Record<Priority, { color: string; bgColor: string; icon: string }> = {
  LOW: {
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    icon: '🟢',
  },
  MEDIUM: {
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    icon: '🟡',
  },
  HIGH: {
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    icon: '🔴',
  },
};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const priority = priorityConfig[todo.priority];
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  const handleToggle = async () => {
    await onToggle(todo.id);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this todo?')) {
      await onDelete(todo.id);
    }
  };

  const handleEdit = () => {
    onEdit(todo);
  };

  return (
    <div
      className={cn(
        'group relative p-4 rounded-lg border transition-all duration-200',
        todo.completed
          ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md'
      )}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className={cn(
            'mt-0.5 flex-shrink-0 transition-colors duration-200',
            todo.completed
              ? 'text-green-600 dark:text-green-400'
              : 'text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
          )}
        >
          {todo.completed ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  'text-base font-medium break-words',
                  todo.completed
                    ? 'text-gray-500 dark:text-gray-400 line-through'
                    : 'text-gray-900 dark:text-gray-100'
                )}
              >
                {todo.title}
              </h3>

              {todo.description && (
                <p
                  className={cn(
                    'mt-1 text-sm break-words',
                    todo.completed
                      ? 'text-gray-400 dark:text-gray-500'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {todo.description}
                </p>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    'inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium',
                    priority.bgColor,
                    priority.color
                  )}
                >
                  <Flag className="w-3 h-3" />
                  {todo.priority}
                </span>

                {todo.dueDate && (
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium',
                      isOverdue
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    )}
                  >
                    <Calendar className="w-3 h-3" />
                    {new Date(todo.dueDate).toLocaleDateString()}
                    {isOverdue && ' (Overdue)'}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleEdit}
                className="p-2 rounded-lg text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                title="Edit todo"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                title="Delete todo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}