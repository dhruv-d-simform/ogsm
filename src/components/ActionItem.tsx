import { useAction } from '@/hooks/useAction';
import { TaskItem } from '@/components/TaskItem';
import { Skeleton } from '@/components/ui/skeleton';

interface ActionItemProps {
    actionId: string;
}

/**
 * ActionItem Component
 * Fetches and displays a single action with its tasks
 */
export function ActionItem({ actionId }: ActionItemProps) {
    const { data: action, isLoading, isError } = useAction(actionId);

    // Loading state - skeleton UI to prevent layout shift
    if (isLoading) {
        return (
            <div>
                {/* Action Name Skeleton */}
                <div className="p-4">
                    <Skeleton className="h-5 w-full" />
                </div>

                {/* Tasks Skeleton */}
                <div className="bg-gray-50">
                    <div className="border-t border-gray-200 py-2 pl-8 pr-4">
                        <Skeleton className="h-5 w-3/4" />
                    </div>
                    <div className="border-t border-gray-200 py-2 pl-8 pr-4">
                        <Skeleton className="h-5 w-3/4" />
                    </div>
                    <div className="border-t border-gray-200 py-2 pl-8 pr-4">
                        <Skeleton className="h-5 w-3/4" />
                    </div>
                </div>
            </div>
        );
    }

    // Error or not found - don't render anything
    if (isError || !action) {
        return null;
    }

    // Success state - render action with tasks
    return (
        <div>
            {/* Action Name */}
            <div className="p-4">
                <p className="text-sm font-medium">{action.name}</p>
            </div>

            {/* Tasks */}
            {action.taskIds.length > 0 && (
                <div className="bg-gray-50">
                    {action.taskIds.map((taskId) => (
                        <TaskItem key={taskId} taskId={taskId} />
                    ))}
                </div>
            )}
        </div>
    );
}
