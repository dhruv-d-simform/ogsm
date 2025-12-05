import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GoalItem } from '@/components/GoalItem';
import { useCreateGoal } from '@/hooks/useGoal';

interface GoalsSectionProps {
    goalIds: string[];
    onGoalCreated?: (goalId: string) => void;
    onGoalDeleted?: (goalId: string) => void;
}

/**
 * Goals Section Component
 * Displays the goals list on the left side of the board
 */
export function GoalsSection({
    goalIds,
    onGoalCreated,
    onGoalDeleted,
}: GoalsSectionProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [newGoalName, setNewGoalName] = useState('');
    const createGoalMutation = useCreateGoal();

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
            className="flex h-full flex-col rounded-lg border border-gray-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header */}
            <div className="rounded-t-lg bg-blue-900 p-4 text-white">
                <h2 className="text-lg font-semibold">Goals</h2>
            </div>

            {/* Content Area - Scrollable List */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    {/* Goals List */}
                    <div>
                        {goalIds.length > 0 ? (
                            goalIds.map((goalId) => (
                                <GoalItem
                                    key={goalId}
                                    goalId={goalId}
                                    onGoalDeleted={onGoalDeleted}
                                />
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500">
                                No goals yet. Add your first goal!
                            </div>
                        )}

                        {/* Add New Goal Input - Visible on Hover */}
                        {isHovered && (
                            <div className="border-t border-gray-200 p-3">
                                <input
                                    type="text"
                                    value={newGoalName}
                                    onChange={(e) =>
                                        setNewGoalName(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    onBlur={handleCreateGoal}
                                    placeholder="Add a new Goal"
                                    disabled={createGoalMutation.isPending}
                                    className="w-full bg-transparent text-sm font-medium text-gray-400 outline-none placeholder:text-gray-400 focus:text-gray-900"
                                />
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
