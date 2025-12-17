import { useState, useEffect } from 'react';
import { useReadOnly } from '@/contexts/ReadOnlyContext';
import { useTask, useUpdateTask, useDeleteTask } from '@/hooks/useTask';
import { Skeleton } from '@/components/ui/skeleton';
import { X, GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskItemProps {
    taskId: string;
    onTaskDeleted?: (taskId: string) => void;
}

/**
 * TaskItem Component
 * Fetches and displays a single task by its ID
 * Supports inline editing and deletion
 * Supports drag-and-drop reordering
 */
export function TaskItem({ taskId, onTaskDeleted }: TaskItemProps) {
    const { data: task, isLoading, isError, isFetching } = useTask(taskId);
    const updateTaskMutation = useUpdateTask();
    const deleteTaskMutation = useDeleteTask();
    const { isReadOnly } = useReadOnly();

    // Sortable hook for drag-and-drop
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: taskId, disabled: isReadOnly });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');
    const [pendingValue, setPendingValue] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);

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
        if (
            isReadOnly ||
            updateTaskMutation.isPending ||
            isFetching ||
            pendingValue
        )
            return;
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

    /**
     * Handle deleting the task
     */
    const handleDeleteTask = () => {
        deleteTaskMutation.mutate(taskId, {
            onSuccess: () => {
                // Notify parent to remove from action
                onTaskDeleted?.(taskId);
            },
        });
    };

    // Loading state - skeleton UI to prevent layout shift
    if (isLoading) {
        return (
            <div className="border-t border-border py-2 pl-8 pr-4">
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
        <div
            ref={setNodeRef}
            style={style}
            className="relative border-t border-border py-2 pl-8 pr-12"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Drag Handler - Visible on Hover, Hidden in Read-Only */}
            {isHovered && !isReadOnly && !isEditing && (
                <button
                    {...attributes}
                    {...listeners}
                    className="absolute left-2 top-2 cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
                    aria-label={`Drag to reorder task: ${task.name}`}
                >
                    <GripVertical className="h-3 w-3" aria-hidden="true" />
                </button>
            )}

            {isEditing ? (
                <input
                    type="text"
                    value={localValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-full bg-transparent text-sm text-muted-foreground outline-none"
                />
            ) : (
                <p
                    onClick={handleClick}
                    className={`${
                        isReadOnly ? '' : 'cursor-pointer hover:opacity-70'
                    } text-sm text-muted-foreground ${
                        updateTaskMutation.isPending || pendingValue
                            ? 'opacity-50'
                            : ''
                    }`}
                    title={isReadOnly ? '' : 'Click to edit'}
                >
                    {pendingValue ||
                        (updateTaskMutation.isPending ? localValue : task.name)}
                </p>
            )}

            {/* Delete Button - Visible on Hover, Hidden in Edit Mode and Read-Only */}
            {isHovered && !isEditing && !isReadOnly && (
                <button
                    onClick={handleDeleteTask}
                    disabled={deleteTaskMutation.isPending}
                    className="absolute right-2 top-2 text-muted-foreground hover:text-destructive disabled:opacity-50"
                    aria-label={`Delete task: ${task.name}`}
                >
                    <X className="h-3 w-3" aria-hidden="true" />
                </button>
            )}
        </div>
    );
}
