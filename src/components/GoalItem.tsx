import type { Goal, KPI } from '@/types';

interface GoalItemProps {
    goal: Goal;
    kpis: KPI[];
}

/**
 * GoalItem Component
 * Displays a single goal with its associated KPIs
 */
export function GoalItem({ goal, kpis }: GoalItemProps) {
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            {/* Goal Name */}
            <div className="p-3">
                <p className="text-sm font-medium">{goal.name}</p>
            </div>

            {/* KPIs List */}
            {kpis.length > 0 && (
                <div className="bg-gray-50">
                    {kpis.map((kpi) => (
                        <div
                            key={kpi.id}
                            className="border-t border-gray-200 py-2 pl-6 pr-3"
                        >
                            <p className="text-sm text-gray-600">{kpi.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
