import { useState, useEffect } from 'react';
import { useGoal, useUpdateGoal, useDeleteGoal } from '@/hooks/useGoal';
import { useCreateKPI } from '@/hooks/useKpi';
import { KPIItem } from '@/components/items/KPIItem';
import { Skeleton } from '@/components/ui/skeleton';
import { X } from 'lucide-react';
import { useReadOnly } from '@/contexts/ReadOnlyContext';

interface GoalItemProps {
    goalId: string;
    onGoalDeleted?: (goalId: string) => void;
}

/**
 * GoalItem Component
 * Fetches and displays a single goal with its associated KPIs
 * Supports inline editing and deletion
 */
export function GoalItem({ goalId, onGoalDeleted }: GoalItemProps) {
    const { data: goal, isLoading, isError, isFetching } = useGoal(goalId);
    const updateGoalMutation = useUpdateGoal();
    const createKpiMutation = useCreateKPI();
    const deleteGoalMutation = useDeleteGoal();
    const { isReadOnly } = useReadOnly();

    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');
    const [pendingValue, setPendingValue] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isKpiHovered, setIsKpiHovered] = useState(false);
    const [newKpiName, setNewKpiName] = useState('');

    /**
     * Sync local state when goal data changes and no mutation is pending
     */
    useEffect(() => {
        if (goal && !isFetching && !updateGoalMutation.isPending) {
            setLocalValue(goal.name);
            setPendingValue(null);
        }
    }, [goal, isFetching, updateGoalMutation.isPending]);

    /**
     * Handle click to enter edit mode
     * Initialize local value with current goal name when entering edit mode
     * Prevent editing if mutation is in progress or data is being refetched
     */
    const handleClick = () => {
        if (
            isReadOnly ||
            updateGoalMutation.isPending ||
            isFetching ||
            pendingValue
        )
            return;
        if (goal) {
            setLocalValue(goal.name);
        }
        setIsEditing(true);
    };

    /**
     * Handle blur to save and exit edit mode
     */
    const handleBlur = () => {
        const trimmedValue = localValue.trim();
        if (trimmedValue && trimmedValue !== goal?.name) {
            // Store the new value to show during refetch
            setPendingValue(trimmedValue);
            // Optimistic update
            updateGoalMutation.mutate({
                id: goalId,
                input: { name: trimmedValue },
            });
        } else if (goal) {
            setLocalValue(goal.name);
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
            if (goal) {
                setLocalValue(goal.name);
            }
            setIsEditing(false);
        }
    };

    /**
     * Handle creating a new KPI
     */
    const handleCreateKpi = () => {
        const trimmedName = newKpiName.trim();
        if (!trimmedName || !goal) return;

        createKpiMutation.mutate(
            {
                name: trimmedName,
                target: 0,
                current: 0,
            },
            {
                onSuccess: (newKpi) => {
                    // Clear input
                    setNewKpiName('');
                    // Update goal with new KPI ID
                    updateGoalMutation.mutate({
                        id: goalId,
                        input: {
                            kpiIds: [...goal.kpiIds, newKpi.id],
                        },
                    });
                },
            }
        );
    };

    /**
     * Handle key down in KPI input (Enter to submit, Escape to clear)
     */
    const handleKpiKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCreateKpi();
        } else if (e.key === 'Escape') {
            setNewKpiName('');
        }
    };

    /**
     * Handle deleting the goal
     */
    const handleDeleteGoal = () => {
        deleteGoalMutation.mutate(goalId, {
            onSuccess: () => {
                // Notify parent to remove from OGSM
                onGoalDeleted?.(goalId);
            },
        });
    };

    /**
     * Handle KPI deletion - remove from goal's kpiIds
     */
    const handleKpiDeleted = (kpiId: string) => {
        if (!goal) return;
        const updatedKpiIds = goal.kpiIds.filter((id) => id !== kpiId);
        updateGoalMutation.mutate({
            id: goalId,
            input: { kpiIds: updatedKpiIds },
        });
    };

    // Loading state - skeleton UI to prevent layout shift
    if (isLoading) {
        return (
            <div className="border-b border-border last:border-b-0">
                <div className="p-3">
                    <Skeleton className="h-5 w-full" />
                </div>
                <div className="bg-muted/50">
                    <div className="border-t border-border py-2 pl-6 pr-3">
                        <Skeleton className="h-5 w-3/4" />
                    </div>
                    <div className="border-t border-border py-2 pl-6 pr-3">
                        <Skeleton className="h-5 w-3/4" />
                    </div>
                    <div className="border-t border-border py-2 pl-6 pr-3">
                        <Skeleton className="h-5 w-3/4" />
                    </div>
                </div>
            </div>
        );
    }

    // Error or not found - don't render anything
    if (isError || !goal) {
        return null;
    }

    // Success state - render goal with KPIs
    return (
        <div
            className="relative border-b border-border last:border-b-0"
            onMouseEnter={() => {
                setIsKpiHovered(true);
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                setIsKpiHovered(false);
                setIsHovered(false);
            }}
        >
            {/* Goal Name - Inline Editable */}
            <div className="p-3 pr-10">
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
                        className={`text-sm font-medium ${
                            isReadOnly ? '' : 'cursor-pointer hover:opacity-70'
                        } ${
                            updateGoalMutation.isPending || pendingValue
                                ? 'opacity-50'
                                : ''
                        }`}
                        title={isReadOnly ? '' : 'Click to edit'}
                    >
                        {pendingValue ||
                            (updateGoalMutation.isPending
                                ? localValue
                                : goal.name)}
                    </p>
                )}
            </div>

            {/* Delete Button - Visible on Hover, Hidden in Edit Mode and Read-Only */}
            {isHovered && !isEditing && !isReadOnly && (
                <button
                    onClick={handleDeleteGoal}
                    disabled={deleteGoalMutation.isPending}
                    className="absolute right-2 top-2 text-muted-foreground hover:text-destructive disabled:opacity-50"
                    aria-label={`Delete goal: ${goal.name}`}
                >
                    <X className="h-3 w-3" aria-hidden="true" />
                </button>
            )}

            {/* KPIs List */}
            {goal.kpiIds.length > 0 && (
                <div className="bg-muted/50">
                    {goal.kpiIds.map((kpiId) => (
                        <KPIItem
                            key={kpiId}
                            kpiId={kpiId}
                            onKpiDeleted={handleKpiDeleted}
                        />
                    ))}

                    {/* Add New KPI Input - Visible on Hover or when input has text, Hidden in Read-Only */}
                    {(isKpiHovered || newKpiName) && !isReadOnly && (
                        <div className="border-t border-border py-2 pl-6 pr-3">
                            <input
                                type="text"
                                value={newKpiName}
                                onChange={(e) => setNewKpiName(e.target.value)}
                                onKeyDown={handleKpiKeyDown}
                                onBlur={handleCreateKpi}
                                placeholder="Add a new KPI"
                                disabled={createKpiMutation.isPending}
                                className="w-full bg-transparent text-sm text-muted-foreground outline-none placeholder:text-muted-foreground focus:text-foreground"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Show KPI section even when empty, on hover or when input has text, but not in Read-Only */}
            {goal.kpiIds.length === 0 &&
                (isKpiHovered || newKpiName) &&
                !isReadOnly && (
                    <div className="bg-muted/50">
                        <div className="py-2 pl-6 pr-3">
                            <input
                                type="text"
                                value={newKpiName}
                                onChange={(e) => setNewKpiName(e.target.value)}
                                onKeyDown={handleKpiKeyDown}
                                onBlur={handleCreateKpi}
                                placeholder="Add a new KPI"
                                disabled={createKpiMutation.isPending}
                                className="w-full bg-transparent text-sm text-muted-foreground outline-none placeholder:text-muted-foreground focus:text-foreground"
                            />
                        </div>
                    </div>
                )}
        </div>
    );
}
