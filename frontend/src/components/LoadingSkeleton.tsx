import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn('animate-pulse', className)}>
      <div className="space-y-3">
        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>
    </div>
  );
}