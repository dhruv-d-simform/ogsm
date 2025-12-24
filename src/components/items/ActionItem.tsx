import { useState, useEffect } from 'react';
import { useReadOnly } from '@/contexts/ReadOnlyContext';
import { useAction, useUpdateAction, useDeleteAction } from '@/hooks/useAction';
import { useCreateTask } from '@/hooks/useTask';
import { TaskItem } from '@/components/items/TaskItem';
import { Skeleton } from '@/components/ui/skeleton';
import { X, GripVertical } from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ActionItemProps {
    actionId: string;
    onActionDeleted?: (actionId: string) => void;
}

/**
 * ActionItem Component
 * Fetches and displays a single action with its tasks
 * Supports inline editing and deletion
 * Supports drag-and-drop reordering of tasks
 * Supports drag-and-drop reordering of actions
 */
export function ActionItem({ actionId, onActionDeleted }: ActionItemProps) {
    const { isReadOnly } = useReadOnly();
    const {
        data: action,
        isLoading,
        isError,
        isFetching,
    } = useAction(actionId);
    const updateActionMutation = useUpdateAction();
    const createTaskMutation = useCreateTask();
    const deleteActionMutation = useDeleteAction();

    // Sortable hook for drag-and-drop of the action itself
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: actionId, disabled: isReadOnly });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');
    const [pendingValue, setPendingValue] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isTaskHovered, setIsTaskHovered] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');

    // Sensors for drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

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
        if (
            isReadOnly ||
            updateActionMutation.isPending ||
            isFetching ||
            pendingValue
        )
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

    /**
     * Handle Task drag end - reorder tasks with optimistic update
     */
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id || !action) {
            return;
        }

        const oldIndex = action.taskIds.indexOf(active.id as string);
        const newIndex = action.taskIds.indexOf(over.id as string);

        if (oldIndex === -1 || newIndex === -1) {
            return;
        }

        const newTaskIds = arrayMove(action.taskIds, oldIndex, newIndex);

        // Optimistic update - update the action with new task order immediately
        updateActionMutation.mutate(
            {
                id: actionId,
                input: { taskIds: newTaskIds },
            },
            {
                // Optimistic update handled by mutation
                onError: () => {
                    // On error, React Query will automatically refetch and restore the previous state
                },
            }
        );
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
                <div className="bg-muted/50">
                    <div className="border-t border-border py-2 pl-8 pr-4">
                        <Skeleton className="h-5 w-3/4" />
                    </div>
                    <div className="border-t border-border py-2 pl-8 pr-4">
                        <Skeleton className="h-5 w-3/4" />
                    </div>
                    <div className="border-t border-border py-2 pl-8 pr-4">
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
            ref={setNodeRef}
            style={style}
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
                <div className="flex items-center gap-2">
                    {/* Drag Handle - Visible on hover, hidden in read-only */}
                    {isHovered && !isReadOnly && (
                        <button
                            className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing"
                            {...attributes}
                            {...listeners}
                            aria-label="Drag to reorder"
                        >
                            <GripVertical className="h-4 w-4" />
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
                            className="w-full bg-transparent text-sm font-medium outline-none"
                        />
                    ) : (
                        <p
                            onClick={handleClick}
                            className={`flex-1 ${
                                isReadOnly
                                    ? ''
                                    : 'cursor-pointer hover:opacity-70'
                            } text-sm font-medium ${
                                updateActionMutation.isPending || pendingValue
                                    ? 'opacity-50'
                                    : ''
                            }`}
                            title={isReadOnly ? '' : 'Click to edit'}
                        >
                            {pendingValue ||
                                (updateActionMutation.isPending
                                    ? localValue
                                    : action.name)}
                        </p>
                    )}
                </div>

                {/* Delete Button - Visible on Hover, Hidden in Edit Mode and Read-Only */}
                {isHovered && !isEditing && !isReadOnly && (
                    <button
                        onClick={handleDeleteAction}
                        disabled={deleteActionMutation.isPending}
                        className="absolute right-2 top-4 text-muted-foreground hover:text-destructive disabled:opacity-50"
                        aria-label={`Delete action: ${action.name}`}
                    >
                        <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                )}
            </div>

            {/* Tasks */}
            {action.taskIds.length > 0 && (
                <div className="bg-muted/50">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={action.taskIds}
                            strategy={verticalListSortingStrategy}
                        >
                            {action.taskIds.map((taskId) => (
                                <TaskItem
                                    key={taskId}
                                    taskId={taskId}
                                    onTaskDeleted={handleTaskDeleted}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>

                    {/* Add New Task Input - Visible on Hover or when input has text, Hidden in Read-Only */}
                    {(isTaskHovered || newTaskName) && !isReadOnly && (
                        <div className="border-t border-border py-2 pl-8 pr-4">
                            <input
                                type="text"
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                                onKeyDown={handleTaskKeyDown}
                                onBlur={handleCreateTask}
                                placeholder="Add a new Task"
                                disabled={createTaskMutation.isPending}
                                className="w-full bg-transparent text-sm text-muted-foreground outline-none placeholder:text-muted-foreground focus:text-foreground"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Show Task section even when empty, on hover or when input has text, Hidden in Read-Only */}
            {action.taskIds.length === 0 &&
                (isTaskHovered || newTaskName) &&
                !isReadOnly && (
                    <div className="bg-muted/50">
                        <div className="py-2 pl-8 pr-4">
                            <input
                                type="text"
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                                onKeyDown={handleTaskKeyDown}
                                onBlur={handleCreateTask}
                                placeholder="Add a new Task"
                                disabled={createTaskMutation.isPending}
                                className="w-full bg-transparent text-sm text-muted-foreground outline-none placeholder:text-muted-foreground focus:text-foreground"
                            />
                        </div>
                    </div>
                )}
        </div>
    );
}
