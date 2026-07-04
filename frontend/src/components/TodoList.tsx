'use client';

import { useState, useEffect, useCallback } from 'react';
import { Filter, Plus, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';
import type { Todo, Priority, TodoQueryParams, ApiError } from '@/types/todo';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { useToast } from './Toast';
import { LoadingSkeleton } from './LoadingSkeleton';

interface TodoListProps {}

export function TodoList({}: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<TodoQueryParams>({});
  const { showToast } = useToast();

  const loadTodos = useCallback(async () => {
    setIsLoading(true);
    setError('');
    const response = await api.getTodos(filter);
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setTodos(response.data);
    }
    setIsLoading(false);
  }, [filter]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const handleCreate = async (data: Parameters<typeof api.createTodo>[0]) => {
    const response = await api.createTodo(data);
    if (response.error) throw new Error(response.error);
    if (response.data) {
      setTodos((prev) => [response.data!, ...prev]);
      setShowForm(false);
      showToast('Todo created successfully', 'success');
    }
  };

  const handleUpdate = async (id: string, data: Parameters<typeof api.updateTodo>[1]) => {
    const response = await api.updateTodo(id, data);
    if (response.error) throw new Error(response.error);
    if (response.data) {
      setTodos((prev) => prev.map((todo) => (todo.id === id ? response.data! : todo)));
      setEditingTodo(null);
      showToast('Todo updated successfully', 'success');
    }
  };

  const handleToggle = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const response = await api.updateTodo(id, { completed: !todo.completed });
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setTodos((prev) => prev.map((t) => (t.id === id ? response.data! : t)));
    }
  };

  const handleDelete = async (id: string) => {
    const response = await api.deleteTodo(id);
    if (response.error) {
      setError(response.error);
    } else {
      setTodos((prev) => prev.filter((t) => t.id !== id));
      showToast('Todo deleted successfully', 'success');
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleFilterChange = (key: keyof TodoQueryParams, value: string) => {
    setFilter((prev) => ({
      ...prev,
      [key]: key === 'completed'
        ? (value === 'true' ? true : value === 'false' ? false : undefined)
        : (value || undefined),
    }));
  };

  const clearFilters = () => {
    setFilter({});
  };

  const activeFiltersCount = Object.values(filter).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Todos</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {todos.filter((t) => !t.completed).length} active, {todos.filter((t) => t.completed).length} completed
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingTodo(null);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition-colors duration-200"
        >
          <Plus className="w-5 h-5" />
          Add Todo
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {(showForm || editingTodo) && (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {editingTodo ? 'Edit Todo' : 'Create New Todo'}
          </h2>
          <TodoForm
            onSubmit={editingTodo ? (data) => handleUpdate(editingTodo.id, data) : handleCreate}
            onCancel={editingTodo ? handleCancelEdit : () => setShowForm(false)}
            initialData={editingTodo || undefined}
            isEditing={!!editingTodo}
          />
        </div>
      )}

      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Filters</h3>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="ml-auto text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filter.completed === undefined ? '' : String(filter.completed)}
              onChange={(e) =>
                handleFilterChange(
                  'completed',
                  e.target.value ? e.target.value : ''
                )
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="false">Active</option>
              <option value="true">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            <select
              value={filter.priority || ''}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
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
              value={filter.dueDate || ''}
              onChange={(e) => handleFilterChange('dueDate', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {filter.completed === true
            ? 'Completed'
            : filter.completed === false
              ? 'Active'
              : 'All Todos'}
        </h2>
        <button
          onClick={loadTodos}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
        >
          <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin')} />
          Refresh
        </button>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : todos.length === 0 ? (
        <div className="text-center py-12 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No todos found</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Plus className="w-4 h-4" />
            Create your first todo
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}