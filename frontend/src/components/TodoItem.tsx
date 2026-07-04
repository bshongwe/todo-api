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

const priorityConfig: Record<Priority, { color: string; bgColor: string; dotColor: string }> = {
  LOW: {
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-50 dark:bg-gray-800/50',
    dotColor: 'bg-gray-400',
  },
  MEDIUM: {
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    dotColor: 'bg-orange-500',
  },
  HIGH: {
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-50 dark:bg-rose-900/20',
    dotColor: 'bg-rose-500',
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
        'group relative p-5 rounded-2xl border-0 shadow-sm transition-all duration-300',
        todo.completed
          ? 'bg-gray-50/80 dark:bg-gray-800/30'
          : 'bg-white dark:bg-gray-800 shadow-gray-200/50 dark:shadow-gray-900/50 hover:shadow-md'
      )}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={handleToggle}
          className={cn(
            'mt-0.5 flex-shrink-0 transition-all duration-200',
            todo.completed
              ? 'text-emerald-500'
              : 'text-gray-300 hover:text-violet-600 dark:hover:text-violet-400'
          )}
        >
          {todo.completed ? (
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className={cn('w-2 h-2 rounded-full', priority.dotColor)} />
                <h3
                  className={cn(
                    'text-base font-semibold break-words',
                    todo.completed
                      ? 'text-gray-400 dark:text-gray-500 line-through'
                      : 'text-gray-900 dark:text-gray-100'
                  )}
                >
                  {todo.title}
                </h3>
              </div>

              {todo.description && (
                <p
                  className={cn(
                    'mt-1 text-sm break-words leading-relaxed',
                    todo.completed
                      ? 'text-gray-400 dark:text-gray-500'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {todo.description}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                    priority.bgColor,
                    priority.color
                  )}
                >
                  {todo.priority}
                </span>

                {todo.dueDate && (
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                      isOverdue
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
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

            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleEdit}
                className="p-2 rounded-lg text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all duration-200"
                title="Edit todo"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
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