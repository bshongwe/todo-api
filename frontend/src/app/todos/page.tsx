'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TodoList } from '@/components/TodoList';
import { useAuth } from '@/components/AuthProvider';

export default function TodosPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push('/auth');
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TodoList />
      </div>
    </div>
  );
}
