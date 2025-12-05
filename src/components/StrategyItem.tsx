import { useState, useEffect } from 'react';
import { useStrategy, useUpdateStrategy } from '@/hooks/useStrategy';
import { DashboardKpiItem } from '@/components/DashboardKpiItem';
import { ActionItem } from '@/components/ActionItem';
import { Skeleton } from '@/components/ui/skeleton';

interface StrategyItemProps {
    strategyId: string;
}

/**
 * StrategyItem Component
 * Fetches and displays a single strategy with its dashboard KPIs and actions
 * Supports inline editing
 */
export function StrategyItem({ strategyId }: StrategyItemProps) {
    const {
        data: strategy,
        isLoading,
        isError,
        isFetching,
    } = useStrategy(strategyId);
    const updateStrategyMutation = useUpdateStrategy();

    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');
    const [pendingValue, setPendingValue] = useState<string | null>(null);

    /**
     * Sync local state when strategy data changes and no mutation is pending
     */
    useEffect(() => {
        if (strategy && !isFetching && !updateStrategyMutation.isPending) {
            setLocalValue(strategy.name);
            setPendingValue(null);
        }
    }, [strategy, isFetching, updateStrategyMutation.isPending]);

    /**
     * Handle click to enter edit mode
     * Initialize local value with current strategy name when entering edit mode
     * Prevent editing if mutation is in progress or data is being refetched
     */
    const handleClick = () => {
        if (updateStrategyMutation.isPending || isFetching || pendingValue)
            return;
        if (strategy) {
            setLocalValue(strategy.name);
        }
        setIsEditing(true);
    };

    /**
     * Handle blur to save and exit edit mode
     */
    const handleBlur = () => {
        const trimmedValue = localValue.trim();
        if (trimmedValue && trimmedValue !== strategy?.name) {
            // Store the new value to show during refetch
            setPendingValue(trimmedValue);
            // Optimistic update
            updateStrategyMutation.mutate({
                id: strategyId,
                input: { name: trimmedValue },
            });
        } else if (strategy) {
            setLocalValue(strategy.name);
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
            if (strategy) {
                setLocalValue(strategy.name);
            }
            setIsEditing(false);
        }
    };

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
                {/* Strategy Name Column - 25% - Inline Editable */}
                <div className="w-[25%] border-r border-gray-200 p-4">
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
                            className={`cursor-pointer text-sm font-medium hover:opacity-70 ${
                                updateStrategyMutation.isPending || pendingValue
                                    ? 'opacity-50'
                                    : ''
                            }`}
                            title="Click to edit"
                        >
                            {pendingValue ||
                                (updateStrategyMutation.isPending
                                    ? localValue
                                    : strategy.name)}
                        </p>
                    )}
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
