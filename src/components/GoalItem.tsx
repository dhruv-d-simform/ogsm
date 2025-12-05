import { useState, useEffect } from 'react';
import { useGoal, useUpdateGoal } from '@/hooks/useGoal';
import { KPIItem } from '@/components/KPIItem';
import { Skeleton } from '@/components/ui/skeleton';

interface GoalItemProps {
    goalId: string;
}

/**
 * GoalItem Component
 * Fetches and displays a single goal with its associated KPIs
 * Supports inline editing
 */
export function GoalItem({ goalId }: GoalItemProps) {
    const { data: goal, isLoading, isError } = useGoal(goalId);
    const updateGoalMutation = useUpdateGoal();

    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');

    /**
     * Sync local state when goal data changes
     */
    useEffect(() => {
        if (goal) {
            setLocalValue(goal.name);
        }
    }, [goal]);

    /**
     * Handle click to enter edit mode
     */
    const handleClick = () => {
        setIsEditing(true);
    };

    /**
     * Handle blur to save and exit edit mode
     */
    const handleBlur = () => {
        const trimmedValue = localValue.trim();
        if (trimmedValue && trimmedValue !== goal?.name) {
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

    // Loading state - skeleton UI to prevent layout shift
    if (isLoading) {
        return (
            <div className="border-b border-gray-200 last:border-b-0">
                <div className="p-3">
                    <Skeleton className="h-5 w-full" />
                </div>
                <div className="bg-gray-50">
                    <div className="border-t border-gray-200 py-2 pl-6 pr-3">
                        <Skeleton className="h-5 w-3/4" />
                    </div>
                    <div className="border-t border-gray-200 py-2 pl-6 pr-3">
                        <Skeleton className="h-5 w-3/4" />
                    </div>
                    <div className="border-t border-gray-200 py-2 pl-6 pr-3">
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
        <div className="border-b border-gray-200 last:border-b-0">
            {/* Goal Name - Inline Editable */}
            <div className="p-3">
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
                        className="cursor-pointer text-sm font-medium hover:opacity-70"
                        title="Click to edit"
                    >
                        {goal.name}
                    </p>
                )}
            </div>

            {/* KPIs List */}
            {goal.kpiIds.length > 0 && (
                <div className="bg-gray-50">
                    {goal.kpiIds.map((kpiId) => (
                        <KPIItem key={kpiId} kpiId={kpiId} />
                    ))}
                </div>
            )}
        </div>
    );
}
