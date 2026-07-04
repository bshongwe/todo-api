'use client';

import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CreateTodoDto, Priority } from '@/types/todo';

interface TodoFormProps {
  onSubmit: (data: CreateTodoDto) => Promise<void>;
  onCancel?: () => void;
  initialData?: Partial<CreateTodoDto>;
  isEditing?: boolean;
}

export function TodoForm({ onSubmit, onCancel, initialData, isEditing = false }: TodoFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority || 'MEDIUM');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(initialData?.title ?? '');
    setDescription(initialData?.description ?? '');
    setPriority(initialData?.priority ?? 'MEDIUM');
    setDueDate(initialData?.dueDate ?? '');
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        dueDate: dueDate || undefined,
        completed: initialData?.completed,
      });

      if (!isEditing) {
        setTitle('');
        setDescription('');
        setPriority('MEDIUM');
        setDueDate('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save todo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className={cn(
            'w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700',
            'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'transition-all duration-200'
          )}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description (optional)"
          rows={3}
          className={cn(
            'w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700',
            'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'transition-all duration-200 resize-none'
          )}
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className={cn(
              'w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700',
              'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'transition-all duration-200'
            )}
            disabled={isSubmitting}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={cn(
              'w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700',
              'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'transition-all duration-200'
            )}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg',
            'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
            'text-white font-medium',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'transition-all duration-200'
          )}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {isEditing ? 'Saving...' : 'Adding...'}
            </>
          ) : (
            <>
              {isEditing ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {isEditing ? 'Update Todo' : 'Add Todo'}
            </>
          )}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              'px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700',
              'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300',
              'hover:bg-gray-50 dark:hover:bg-gray-700',
              'font-medium',
              'transition-all duration-200'
            )}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}