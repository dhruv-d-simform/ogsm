import { useState } from 'react';
import { useReadOnly } from '@/contexts/ReadOnlyContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GoalItem } from '@/components/items/GoalItem';
import { useCreateGoal } from '@/hooks/useGoal';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { useUpdateOGSM } from '@/hooks/useOgsm';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';

interface GoalsSectionProps {
    ogsmId: string;
    goalIds: string[];
    onGoalCreated?: (goalId: string) => void;
    onGoalDeleted?: (goalId: string) => void;
}

/**
 * Goals Section Component
 * Displays the goals list on the left side of the board
 * Supports drag-and-drop reordering of goals
 */
export function GoalsSection({
    ogsmId,
    goalIds,
    onGoalCreated,
    onGoalDeleted,
}: GoalsSectionProps) {
    const { isReadOnly } = useReadOnly();
    const [isHovered, setIsHovered] = useState(false);
    const [newGoalName, setNewGoalName] = useState('');
    const createGoalMutation = useCreateGoal();
    const updateOGSMMutation = useUpdateOGSM();

    // Configure sensors for drag-and-drop
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    /**
     * Handle goal drag end - reorder goals with optimistic update
     */
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = goalIds.indexOf(active.id as string);
        const newIndex = goalIds.indexOf(over.id as string);

        if (oldIndex === -1 || newIndex === -1) {
            return;
        }

        const newGoalIds = arrayMove(goalIds, oldIndex, newIndex);

        // Optimistic update - update the OGSM with new goal order immediately
        updateOGSMMutation.mutate(
            {
                id: ogsmId,
                input: { goalIds: newGoalIds },
            },
            {
                // Optimistic update handled by mutation
                onError: () => {
                    // On error, React Query will automatically refetch and restore the previous state
                },
            }
        );
    };

    /**
     * Handle creating a new goal
     */
    const handleCreateGoal = () => {
        const trimmedName = newGoalName.trim();
        if (!trimmedName) return;

        createGoalMutation.mutate(
            {
                name: trimmedName,
                kpiIds: [],
            },
            {
                onSuccess: (newGoal) => {
                    // Clear input
                    setNewGoalName('');
                    // Notify parent to update OGSM
                    onGoalCreated?.(newGoal.id);
                },
            }
        );
    };

    /**
     * Handle key down in input (Enter to submit, Escape to clear)
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCreateGoal();
        } else if (e.key === 'Escape') {
            setNewGoalName('');
        }
    };

    return (
        <div
            className="flex h-full flex-col rounded-lg border border-border"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header */}
            <div className="rounded-t-lg bg-primary p-4 text-primary-foreground">
                <SectionHeader
                    initial="G"
                    label="Goals"
                    description="Specific, measurable targets that support your objective. Goals should be quantifiable and time-bound, providing clear milestones to track progress toward your objective."
                />
            </div>

            {/* Content Area - Scrollable List */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={goalIds}
                            strategy={verticalListSortingStrategy}
                        >
                            {/* Goals List */}
                            <div>
                                {goalIds.length > 0
                                    ? goalIds.map((goalId) => (
                                          <GoalItem
                                              key={goalId}
                                              goalId={goalId}
                                              onGoalDeleted={onGoalDeleted}
                                          />
                                      ))
                                    : // Show empty state only in read-only mode or when input is not visible
                                      (isReadOnly ||
                                          (!isHovered && !newGoalName)) && (
                                          <div className="p-4 text-center text-sm text-muted-foreground">
                                              No goals yet. Add your first goal!
                                          </div>
                                      )}

                                {/* Add New Goal Input - Visible on Hover or when input has text, Hidden in Read-Only */}
                                {(isHovered || newGoalName) && !isReadOnly && (
                                    <div className="border-t border-border p-3">
                                        <input
                                            type="text"
                                            value={newGoalName}
                                            onChange={(e) =>
                                                setNewGoalName(e.target.value)
                                            }
                                            onKeyDown={handleKeyDown}
                                            onBlur={handleCreateGoal}
                                            placeholder="Add a new Goal"
                                            disabled={
                                                createGoalMutation.isPending
                                            }
                                            className="w-full bg-transparent text-sm font-medium text-muted-foreground outline-none placeholder:text-muted-foreground focus:text-foreground"
                                        />
                                    </div>
                                )}
                            </div>
                        </SortableContext>
                    </DndContext>
                </ScrollArea>
            </div>
        </div>
    );
}
