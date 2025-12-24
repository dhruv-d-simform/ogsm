import { useState, useEffect } from 'react';
import { useReadOnly } from '@/contexts/ReadOnlyContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StrategyItem } from '@/components/items/StrategyItem';
import { useCreateStrategy } from '@/hooks/useStrategy';
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

interface StrategySectionProps {
    ogsmId: string;
    strategyIds: string[];
    onStrategyCreated?: (strategyId: string) => void;
    onStrategyDeleted?: (strategyId: string) => void;
}

/**
 * Strategy Section Component
 * Displays the strategies in a grid on the right side of the board
 * Supports drag-and-drop reordering of strategies
 */
export function StrategySection({
    ogsmId,
    strategyIds,
    onStrategyCreated,
    onStrategyDeleted,
}: StrategySectionProps) {
    const { isReadOnly } = useReadOnly();
    const [isHovered, setIsHovered] = useState(false);
    const [newStrategyName, setNewStrategyName] = useState('');
    const createStrategyMutation = useCreateStrategy();
    const updateOGSMMutation = useUpdateOGSM();

    // Local state to track reordered strategy IDs for instant visual feedback
    const [localStrategyIds, setLocalStrategyIds] = useState(strategyIds);

    // Update local state when prop changes (from parent or refetch)
    useEffect(() => {
        setLocalStrategyIds(strategyIds);
    }, [strategyIds]);

    // Configure sensors for drag-and-drop
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    /**
     * Handle strategy drag end - reorder strategies with optimistic update
     */
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = localStrategyIds.indexOf(active.id as string);
        const newIndex = localStrategyIds.indexOf(over.id as string);

        if (oldIndex === -1 || newIndex === -1) {
            return;
        }

        const newStrategyIds = arrayMove(localStrategyIds, oldIndex, newIndex);

        // Update local state immediately for instant visual feedback
        setLocalStrategyIds(newStrategyIds);

        // Optimistic update - update the OGSM with new strategy order
        updateOGSMMutation.mutate(
            {
                id: ogsmId,
                input: { strategyIds: newStrategyIds },
            },
            {
                // Optimistic update handled by mutation
                onError: () => {
                    // On error, revert to original order
                    setLocalStrategyIds(strategyIds);
                },
            }
        );
    };

    /**
     * Handle creating a new strategy
     */
    const handleCreateStrategy = () => {
        const trimmedName = newStrategyName.trim();
        if (!trimmedName) return;

        createStrategyMutation.mutate(
            {
                name: trimmedName,
                dashboardKpiIds: [],
                actionIds: [],
            },
            {
                onSuccess: (newStrategy) => {
                    // Clear input
                    setNewStrategyName('');
                    // Notify parent to update OGSM
                    onStrategyCreated?.(newStrategy.id);
                },
            }
        );
    };

    /**
     * Handle key down in input (Enter to submit, Escape to clear)
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCreateStrategy();
        } else if (e.key === 'Escape') {
            setNewStrategyName('');
        }
    };

    return (
        <div
            className="flex h-full flex-col rounded-lg border border-border"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main Header - Strategy and Measures */}
            <div className="flex rounded-t-lg bg-primary text-primary-foreground">
                <div className="w-[25%] border-r border-primary-foreground/20 p-4">
                    <SectionHeader
                        initial="S"
                        label="Strategy"
                        description="High-level approaches or methods used to achieve your goals. Strategies define how you will accomplish your objectives and should be actionable and aligned with your goals."
                    />
                </div>
                <div className="w-[75%] p-4">
                    <SectionHeader
                        initial="M"
                        label="Measures"
                        description="Key Performance Indicators (KPIs) and actions that track progress and implementation of your strategies. Measures include both metrics to monitor performance and specific tasks to execute your plan."
                    />
                </div>
            </div>

            {/* Sub-header - Strategies, Dashboard, Actions */}
            <div className="flex border-b border-border bg-card text-sm">
                <div className="w-[25%] border-r border-border p-3">
                    <span className="font-medium text-foreground">
                        Strategies
                    </span>
                </div>
                <div className="w-[25%] border-r border-border p-3">
                    <span className="font-medium text-foreground">
                        Dashboard
                    </span>
                </div>
                <div className="w-[50%] p-3">
                    <span className="font-medium text-foreground">Actions</span>
                </div>
            </div>

            {/* Content Area - Scrollable Strategy List */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={localStrategyIds}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="flex flex-col gap-4">
                                {localStrategyIds.length > 0
                                    ? localStrategyIds.map((strategyId) => (
                                          <StrategyItem
                                              key={strategyId}
                                              strategyId={strategyId}
                                              onStrategyDeleted={
                                                  onStrategyDeleted
                                              }
                                          />
                                      ))
                                    : // Show empty state only in read-only mode or when input is not visible
                                      (isReadOnly ||
                                          (!isHovered && !newStrategyName)) && (
                                          <div className="p-8 text-center text-sm text-muted-foreground">
                                              No strategies yet. Add your first
                                              strategy!
                                          </div>
                                      )}

                                {/* Add New Strategy Input - Visible on Hover or when input has text, Hidden in Read-Only */}
                                {(isHovered || newStrategyName) &&
                                    !isReadOnly && (
                                        <div className="shadow-sm">
                                            <div className="flex">
                                                {/* Strategy Name Input - 25% */}
                                                <div className="w-[25%] border-r border-border p-4">
                                                    <input
                                                        type="text"
                                                        value={newStrategyName}
                                                        onChange={(e) =>
                                                            setNewStrategyName(
                                                                e.target.value
                                                            )
                                                        }
                                                        onKeyDown={
                                                            handleKeyDown
                                                        }
                                                        onBlur={
                                                            handleCreateStrategy
                                                        }
                                                        placeholder="Add a new Strategy"
                                                        disabled={
                                                            createStrategyMutation.isPending
                                                        }
                                                        className="w-full bg-transparent text-sm font-medium text-muted-foreground outline-none placeholder:text-muted-foreground focus:text-foreground"
                                                    />
                                                </div>

                                                {/* Placeholder columns */}
                                                <div className="w-[25%] border-r border-border p-4" />
                                                <div className="w-[50%] p-4" />
                                            </div>
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
