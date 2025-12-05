import { useGoal } from '@/hooks/useGoal';
import { KPIItem } from '@/components/KPIItem';
import { Skeleton } from '@/components/ui/skeleton';

interface GoalItemProps {
    goalId: string;
}

/**
 * GoalItem Component
 * Fetches and displays a single goal with its associated KPIs
 */
export function GoalItem({ goalId }: GoalItemProps) {
    const { data: goal, isLoading, isError } = useGoal(goalId);

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
            {/* Goal Name */}
            <div className="p-3">
                <p className="text-sm font-medium">{goal.name}</p>
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
