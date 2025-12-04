import type { Strategy, KPI, Action, Task } from '@/types';

interface StrategyItemProps {
    strategy: Strategy;
    dashboardKpis: KPI[];
    actions: Array<{
        action: Action;
        tasks: Task[];
    }>;
}

/**
 * StrategyItem Component
 * Displays a single strategy with its dashboard KPIs and actions
 */
export function StrategyItem({
    strategy,
    dashboardKpis,
    actions,
}: StrategyItemProps) {
    return (
        <div className="shadow-sm">
            <div className="flex">
                {/* Strategy Name Column - 25% */}
                <div className="w-[25%] border-r border-gray-200 p-4">
                    <p className="text-sm font-medium">{strategy.name}</p>
                </div>

                {/* Dashboard KPIs Column - 25% */}
                <div className="w-[25%] border-r border-gray-200">
                    {dashboardKpis.length > 0 ? (
                        <div>
                            {dashboardKpis.map((kpi, index) => (
                                <div
                                    key={kpi.id}
                                    className={`p-4 ${
                                        index > 0
                                            ? 'border-t border-gray-200'
                                            : ''
                                    }`}
                                >
                                    <p className="text-sm">{kpi.name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4">
                            <p className="text-sm text-gray-400">No KPIs</p>
                        </div>
                    )}
                </div>

                {/* Actions Column - 50% */}
                <div className="w-[50%]">
                    {actions.length > 0 ? (
                        <div>
                            {actions.map((actionWithTasks, index) => (
                                <div
                                    key={actionWithTasks.action.id}
                                    className={
                                        index > 0
                                            ? 'border-t border-gray-200'
                                            : ''
                                    }
                                >
                                    {/* Action Name */}
                                    <div className="p-4">
                                        <p className="text-sm font-medium">
                                            {actionWithTasks.action.name}
                                        </p>
                                    </div>

                                    {/* Tasks */}
                                    {actionWithTasks.tasks.length > 0 && (
                                        <div className="bg-gray-50">
                                            {actionWithTasks.tasks.map(
                                                (task) => (
                                                    <div
                                                        key={task.id}
                                                        className="border-t border-gray-200 py-2 pl-8 pr-4"
                                                    >
                                                        <p className="text-sm text-gray-600">
                                                            {task.name}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4">
                            <p className="text-sm text-gray-400">No Actions</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
