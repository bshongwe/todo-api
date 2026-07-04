'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';
import { cn } from '@/lib/utils';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const res = mode === 'register'
      ? await api.register({ email, password, name: name || undefined })
      : await api.login({ email, password });

    if (res.error) {
      setError(res.error);
      setIsSubmitting(false);
      return;
    }

    setUser(res.data!);
    router.push('/todos');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              {mode === 'login' ? 'Register' : 'Login'}
            </button>
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={cn(
                'w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700',
                'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100',
                'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
              )}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={cn(
              'w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700',
              'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
            )}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={cn(
              'w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700',
              'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
            )}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
            )}
          >
            {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
