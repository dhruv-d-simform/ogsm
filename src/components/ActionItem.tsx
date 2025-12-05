import { useState, useEffect } from 'react';
import { useAction, useUpdateAction } from '@/hooks/useAction';
import { TaskItem } from '@/components/TaskItem';
import { Skeleton } from '@/components/ui/skeleton';

interface ActionItemProps {
    actionId: string;
}

/**
 * ActionItem Component
 * Fetches and displays a single action with its tasks
 * Supports inline editing
 */
export function ActionItem({ actionId }: ActionItemProps) {
    const {
        data: action,
        isLoading,
        isError,
        isFetching,
    } = useAction(actionId);
    const updateActionMutation = useUpdateAction();

    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');
    const [pendingValue, setPendingValue] = useState<string | null>(null);

    /**
     * Sync local state when action data changes and no mutation is pending
     */
    useEffect(() => {
        if (action && !isFetching && !updateActionMutation.isPending) {
            setLocalValue(action.name);
            setPendingValue(null);
        }
    }, [action, isFetching, updateActionMutation.isPending]);

    /**
     * Handle click to enter edit mode
     * Initialize local value with current action name when entering edit mode
     * Prevent editing if mutation is in progress or data is being refetched
     */
    const handleClick = () => {
        if (updateActionMutation.isPending || isFetching || pendingValue)
            return;
        if (action) {
            setLocalValue(action.name);
        }
        setIsEditing(true);
    };

    /**
     * Handle blur to save and exit edit mode
     */
    const handleBlur = () => {
        const trimmedValue = localValue.trim();
        if (trimmedValue && trimmedValue !== action?.name) {
            // Store the new value to show during refetch
            setPendingValue(trimmedValue);
            // Optimistic update
            updateActionMutation.mutate({
                id: actionId,
                input: { name: trimmedValue },
            });
        } else if (action) {
            setLocalValue(action.name);
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
            if (action) {
                setLocalValue(action.name);
            }
            setIsEditing(false);
        }
    };

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
            {/* Action Name - Inline Editable */}
            <div className="p-4">
                {isEditing ? (
                    <input
                        type="text"
                        value={localValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="w-full bg-transparent text-sm font-medium outline-none"
                    />
                ) : (
                    <p
                        onClick={handleClick}
                        className={`cursor-pointer text-sm font-medium hover:opacity-70 ${
                            updateActionMutation.isPending || pendingValue
                                ? 'opacity-50'
                                : ''
                        }`}
                        title="Click to edit"
                    >
                        {pendingValue ||
                            (updateActionMutation.isPending
                                ? localValue
                                : action.name)}
                    </p>
                )}
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
