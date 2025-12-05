import { useState, useEffect } from 'react';
import { useTask, useUpdateTask } from '@/hooks/useTask';
import { Skeleton } from '@/components/ui/skeleton';

interface TaskItemProps {
    taskId: string;
}

/**
 * TaskItem Component
 * Fetches and displays a single task by its ID
 * Supports inline editing
 */
export function TaskItem({ taskId }: TaskItemProps) {
    const { data: task, isLoading, isError, isFetching } = useTask(taskId);
    const updateTaskMutation = useUpdateTask();

    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');
    const [pendingValue, setPendingValue] = useState<string | null>(null);

    /**
     * Sync local state when task data changes and no mutation is pending
     */
    useEffect(() => {
        if (task && !isFetching && !updateTaskMutation.isPending) {
            setLocalValue(task.name);
            setPendingValue(null);
        }
    }, [task, isFetching, updateTaskMutation.isPending]);

    /**
     * Handle click to enter edit mode
     * Initialize local value with current task name when entering edit mode
     * Prevent editing if mutation is in progress or data is being refetched
     */
    const handleClick = () => {
        if (updateTaskMutation.isPending || isFetching || pendingValue) return;
        if (task) {
            setLocalValue(task.name);
        }
        setIsEditing(true);
    };

    /**
     * Handle blur to save and exit edit mode
     */
    const handleBlur = () => {
        const trimmedValue = localValue.trim();
        if (trimmedValue && trimmedValue !== task?.name) {
            // Store the new value to show during refetch
            setPendingValue(trimmedValue);
            // Optimistic update
            updateTaskMutation.mutate({
                id: taskId,
                input: { name: trimmedValue },
            });
        } else if (task) {
            setLocalValue(task.name);
        }
        setIsEditing(false);
    };

    /**
     * Handle input change
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    };

    /**
     * Handle key down (Enter to save, Escape to cancel)
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBlur();
        } else if (e.key === 'Escape') {
            if (task) {
                setLocalValue(task.name);
            }
            setIsEditing(false);
        }
    };

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

    // Success state - render task with inline editing
    return (
        <div className="border-t border-gray-200 py-2 pl-8 pr-4">
            {isEditing ? (
                <input
                    type="text"
                    value={localValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-full bg-transparent text-sm text-gray-600 outline-none"
                />
            ) : (
                <p
                    onClick={handleClick}
                    className={`cursor-pointer text-sm text-gray-600 hover:opacity-70 ${
                        updateTaskMutation.isPending || pendingValue
                            ? 'opacity-50'
                            : ''
                    }`}
                    title="Click to edit"
                >
                    {pendingValue ||
                        (updateTaskMutation.isPending ? localValue : task.name)}
                </p>
            )}
        </div>
    );
}
