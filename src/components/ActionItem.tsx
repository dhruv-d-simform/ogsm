import { useState, useEffect } from 'react';
import { useAction, useUpdateAction, useDeleteAction } from '@/hooks/useAction';
import { useCreateTask } from '@/hooks/useTask';
import { TaskItem } from '@/components/TaskItem';
import { Skeleton } from '@/components/ui/skeleton';
import { X } from 'lucide-react';

interface ActionItemProps {
    actionId: string;
    onActionDeleted?: (actionId: string) => void;
}

/**
 * ActionItem Component
 * Fetches and displays a single action with its tasks
 * Supports inline editing and deletion
 */
export function ActionItem({ actionId, onActionDeleted }: ActionItemProps) {
    const {
        data: action,
        isLoading,
        isError,
        isFetching,
    } = useAction(actionId);
    const updateActionMutation = useUpdateAction();
    const createTaskMutation = useCreateTask();
    const deleteActionMutation = useDeleteAction();

    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');
    const [pendingValue, setPendingValue] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isTaskHovered, setIsTaskHovered] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');

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

    /**
     * Handle creating a new Task
     */
    const handleCreateTask = () => {
        const trimmedName = newTaskName.trim();
        if (!trimmedName || !action) return;

        createTaskMutation.mutate(
            {
                name: trimmedName,
                status: 'pending',
            },
            {
                onSuccess: (newTask) => {
                    // Clear input
                    setNewTaskName('');
                    // Update action with new Task ID
                    updateActionMutation.mutate({
                        id: actionId,
                        input: {
                            taskIds: [...action.taskIds, newTask.id],
                        },
                    });
                },
            }
        );
    };

    /**
     * Handle key down in Task input (Enter to submit, Escape to clear)
     */
    const handleTaskKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCreateTask();
        } else if (e.key === 'Escape') {
            setNewTaskName('');
        }
    };

    /**
     * Handle deleting the action
     */
    const handleDeleteAction = () => {
        deleteActionMutation.mutate(actionId, {
            onSuccess: () => {
                // Notify parent to remove from strategy
                onActionDeleted?.(actionId);
            },
        });
    };

    /**
     * Handle Task deletion - remove from action's taskIds
     */
    const handleTaskDeleted = (taskId: string) => {
        if (!action) return;
        const updatedTaskIds = action.taskIds.filter(
            (id: string) => id !== taskId
        );
        updateActionMutation.mutate({
            id: actionId,
            input: { taskIds: updatedTaskIds },
        });
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
        <div
            onMouseEnter={() => {
                setIsTaskHovered(true);
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                setIsTaskHovered(false);
                setIsHovered(false);
            }}
        >
            {/* Action Name - Inline Editable */}
            <div className="relative p-4 pr-10">
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

                {/* Delete Button - Visible on Hover, Hidden in Edit Mode */}
                {isHovered && !isEditing && (
                    <button
                        onClick={handleDeleteAction}
                        disabled={deleteActionMutation.isPending}
                        className="absolute right-2 top-4 text-gray-400 hover:text-red-600 disabled:opacity-50"
                        title="Delete action"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Tasks */}
            {action.taskIds.length > 0 && (
                <div className="bg-gray-50">
                    {action.taskIds.map((taskId) => (
                        <TaskItem
                            key={taskId}
                            taskId={taskId}
                            onTaskDeleted={handleTaskDeleted}
                        />
                    ))}

                    {/* Add New Task Input - Visible on Hover */}
                    {isTaskHovered && (
                        <div className="border-t border-gray-200 py-2 pl-8 pr-4">
                            <input
                                type="text"
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                                onKeyDown={handleTaskKeyDown}
                                onBlur={handleCreateTask}
                                placeholder="Add a new Task"
                                disabled={createTaskMutation.isPending}
                                className="w-full bg-transparent text-sm text-gray-400 outline-none placeholder:text-gray-400 focus:text-gray-600"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Show Task section even when empty, on hover */}
            {action.taskIds.length === 0 && isTaskHovered && (
                <div className="bg-gray-50">
                    <div className="py-2 pl-8 pr-4">
                        <input
                            type="text"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            onKeyDown={handleTaskKeyDown}
                            onBlur={handleCreateTask}
                            placeholder="Add a new Task"
                            disabled={createTaskMutation.isPending}
                            className="w-full bg-transparent text-sm text-gray-400 outline-none placeholder:text-gray-400 focus:text-gray-600"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
