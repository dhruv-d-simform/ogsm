import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { GoalItem } from '@/components/GoalItem';

interface GoalsSectionProps {
    goalIds: string[];
}

/**
 * Goals Section Component
 * Displays the goals list on the left side of the board
 */
export function GoalsSection({ goalIds }: GoalsSectionProps) {
    return (
        <div className="flex h-full flex-col rounded-lg border border-gray-300">
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
                                <GoalItem key={goalId} goalId={goalId} />
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500">
                                No goals yet. Add your first goal!
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>

            {/* Add New Goal Input */}
            <div className="border-t border-gray-300 p-3">
                <Input
                    type="text"
                    placeholder="Add new goal..."
                    className="text-sm"
                />
            </div>
        </div>
    );
}
