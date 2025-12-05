import { useTask } from '@/hooks/useTask';
import { Skeleton } from '@/components/ui/skeleton';

interface TaskItemProps {
    taskId: string;
}

/**
 * TaskItem Component
 * Fetches and displays a single task by its ID
 */
export function TaskItem({ taskId }: TaskItemProps) {
    const { data: task, isLoading, isError } = useTask(taskId);

    // Loading state - skeleton UI to prevent layout shift
    if (isLoading) {
        return (
            <div className="border-t border-gray-200 py-2 pl-8 pr-4">
                <Skeleton className="h-5 w-3/4" />
            </div>
        );
    }

    // Error or not found - don't render anything
    if (isError || !task) {
        return null;
    }

    // Success state - render task
    return (
        <div className="border-t border-gray-200 py-2 pl-8 pr-4">
            <p className="text-sm text-gray-600">{task.name}</p>
        </div>
    );
}
