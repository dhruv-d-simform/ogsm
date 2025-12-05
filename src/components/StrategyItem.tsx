import { useState, useEffect } from 'react';
import { useStrategy, useUpdateStrategy } from '@/hooks/useStrategy';
import { useCreateKPI } from '@/hooks/useKpi';
import { useCreateAction } from '@/hooks/useAction';
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
    const createKpiMutation = useCreateKPI();
    const createActionMutation = useCreateAction();

    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');
    const [pendingValue, setPendingValue] = useState<string | null>(null);
    const [isKpiHovered, setIsKpiHovered] = useState(false);
    const [newKpiName, setNewKpiName] = useState('');
    const [isActionHovered, setIsActionHovered] = useState(false);
    const [newActionName, setNewActionName] = useState('');

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

    /**
     * Handle creating a new Dashboard KPI
     */
    const handleCreateKpi = () => {
        const trimmedName = newKpiName.trim();
        if (!trimmedName || !strategy) return;

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
                    // Update strategy with new KPI ID
                    updateStrategyMutation.mutate({
                        id: strategyId,
                        input: {
                            dashboardKpiIds: [
                                ...strategy.dashboardKpiIds,
                                newKpi.id,
                            ],
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
     * Handle creating a new Action
     */
    const handleCreateAction = () => {
        const trimmedName = newActionName.trim();
        if (!trimmedName || !strategy) return;

        createActionMutation.mutate(
            {
                name: trimmedName,
                taskIds: [],
            },
            {
                onSuccess: (newAction) => {
                    // Clear input
                    setNewActionName('');
                    // Update strategy with new Action ID
                    updateStrategyMutation.mutate({
                        id: strategyId,
                        input: {
                            actionIds: [...strategy.actionIds, newAction.id],
                        },
                    });
                },
            }
        );
    };

    /**
     * Handle key down in Action input (Enter to submit, Escape to clear)
     */
    const handleActionKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCreateAction();
        } else if (e.key === 'Escape') {
            setNewActionName('');
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
                <div
                    className="w-[25%] border-r border-gray-200"
                    onMouseEnter={() => setIsKpiHovered(true)}
                    onMouseLeave={() => setIsKpiHovered(false)}
                >
                    {strategy.dashboardKpiIds.length > 0 ? (
                        <div>
                            {strategy.dashboardKpiIds.map((kpiId, index) => (
                                <DashboardKpiItem
                                    key={kpiId}
                                    kpiId={kpiId}
                                    showBorder={index > 0}
                                />
                            ))}

                            {/* Add New KPI Input - Visible on Hover */}
                            {isKpiHovered && (
                                <div className="border-t border-gray-200 p-4">
                                    <input
                                        type="text"
                                        value={newKpiName}
                                        onChange={(e) =>
                                            setNewKpiName(e.target.value)
                                        }
                                        onKeyDown={handleKpiKeyDown}
                                        onBlur={handleCreateKpi}
                                        placeholder="Add a new KPI"
                                        disabled={createKpiMutation.isPending}
                                        className="w-full bg-transparent text-sm text-gray-400 outline-none placeholder:text-gray-400 focus:text-gray-600"
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-4">
                            {isKpiHovered ? (
                                <input
                                    type="text"
                                    value={newKpiName}
                                    onChange={(e) =>
                                        setNewKpiName(e.target.value)
                                    }
                                    onKeyDown={handleKpiKeyDown}
                                    onBlur={handleCreateKpi}
                                    placeholder="Add a new KPI"
                                    disabled={createKpiMutation.isPending}
                                    className="w-full bg-transparent text-sm text-gray-400 outline-none placeholder:text-gray-400 focus:text-gray-600"
                                />
                            ) : (
                                <p className="text-sm text-gray-400">No KPIs</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Actions Column - 50% */}
                <div
                    className="w-[50%]"
                    onMouseEnter={() => setIsActionHovered(true)}
                    onMouseLeave={() => setIsActionHovered(false)}
                >
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

                            {/* Add New Action Input - Visible on Hover */}
                            {isActionHovered && (
                                <div className="border-t border-gray-200 p-4">
                                    <input
                                        type="text"
                                        value={newActionName}
                                        onChange={(e) =>
                                            setNewActionName(e.target.value)
                                        }
                                        onKeyDown={handleActionKeyDown}
                                        onBlur={handleCreateAction}
                                        placeholder="Add a new Action"
                                        disabled={
                                            createActionMutation.isPending
                                        }
                                        className="w-full bg-transparent text-sm font-medium text-gray-400 outline-none placeholder:text-gray-400 focus:text-gray-900"
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-4">
                            {isActionHovered ? (
                                <input
                                    type="text"
                                    value={newActionName}
                                    onChange={(e) =>
                                        setNewActionName(e.target.value)
                                    }
                                    onKeyDown={handleActionKeyDown}
                                    onBlur={handleCreateAction}
                                    placeholder="Add a new Action"
                                    disabled={createActionMutation.isPending}
                                    className="w-full bg-transparent text-sm font-medium text-gray-400 outline-none placeholder:text-gray-400 focus:text-gray-900"
                                />
                            ) : (
                                <p className="text-sm text-gray-400">
                                    No Actions
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
