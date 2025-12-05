import { useStrategy } from '@/hooks/useStrategy';
import { DashboardKpiItem } from '@/components/DashboardKpiItem';
import { ActionItem } from '@/components/ActionItem';
import { Skeleton } from '@/components/ui/skeleton';

interface StrategyItemProps {
    strategyId: string;
}

/**
 * StrategyItem Component
 * Fetches and displays a single strategy with its dashboard KPIs and actions
 */
export function StrategyItem({ strategyId }: StrategyItemProps) {
    const { data: strategy, isLoading, isError } = useStrategy(strategyId);

    // Loading state - skeleton UI to prevent layout shift
    if (isLoading) {
        return (
            <div className="shadow-sm">
                <div className="flex">
                    {/* Strategy Name Column - 25% */}
                    <div className="w-[25%] border-r border-gray-200 p-4">
                        <Skeleton className="h-5 w-full" />
                    </div>

                    {/* Dashboard KPIs Column - 25% */}
                    <div className="w-[25%] border-r border-gray-200">
                        <div className="p-4">
                            <Skeleton className="h-5 w-3/4" />
                        </div>
                    </div>

                    {/* Actions Column - 50% */}
                    <div className="w-[50%]">
                        <div>
                            {/* Action Skeleton */}
                            <div className="p-4">
                                <Skeleton className="h-5 w-full" />
                            </div>
                            {/* Tasks Skeleton */}
                            <div className="bg-gray-50">
                                <div className="border-t border-gray-200 py-2 pl-8 pr-4">
                                    <Skeleton className="h-5 w-3/4" />
                                </div>
                                <div className="border-t border-gray-200 py-2 pl-8 pr-4">
                                    <Skeleton className="h-5 w-3/4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error or not found - don't render anything
    if (isError || !strategy) {
        return null;
    }

    // Success state - render strategy with dashboard KPIs and actions
    return (
        <div className="shadow-sm">
            <div className="flex">
                {/* Strategy Name Column - 25% */}
                <div className="w-[25%] border-r border-gray-200 p-4">
                    <p className="text-sm font-medium">{strategy.name}</p>
                </div>

                {/* Dashboard KPIs Column - 25% */}
                <div className="w-[25%] border-r border-gray-200">
                    {strategy.dashboardKpiIds.length > 0 ? (
                        <div>
                            {strategy.dashboardKpiIds.map((kpiId, index) => (
                                <DashboardKpiItem
                                    key={kpiId}
                                    kpiId={kpiId}
                                    showBorder={index > 0}
                                />
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
                    {strategy.actionIds.length > 0 ? (
                        <div>
                            {strategy.actionIds.map((actionId, index) => (
                                <div
                                    key={actionId}
                                    className={
                                        index > 0
                                            ? 'border-t border-gray-200'
                                            : ''
                                    }
                                >
                                    <ActionItem actionId={actionId} />
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
