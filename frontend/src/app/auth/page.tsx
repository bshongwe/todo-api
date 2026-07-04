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

    if (res.data) {
      setUser(res.data);
      router.push('/todos');
    } else {
      setError('Authentication failed');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 px-4">
      <div className="w-full max-w-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 space-y-6 shadow-xl">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-violet-600 dark:text-violet-400 hover:underline font-medium"
            >
              {mode === 'login' ? 'Register' : 'Login'}
            </button>
          </p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-600 dark:text-red-400">
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
                'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700',
                'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100',
                'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500'
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
              'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700',
              'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500'
            )}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={cn(
              'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700',
              'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100',
              'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500'
            )}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium',
              'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md'
            )}
          >
            {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
