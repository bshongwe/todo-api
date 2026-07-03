import { TodoList } from '@/components/TodoList';

export default function TodosPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TodoList userId="demo-user" />
      </div>
    </div>
  );
}
