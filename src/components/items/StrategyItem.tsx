import { useState, useEffect } from 'react';
import { useReadOnly } from '@/contexts/ReadOnlyContext';
import {
    useStrategy,
    useUpdateStrategy,
    useDeleteStrategy,
} from '@/hooks/useStrategy';
import { useCreateKPI } from '@/hooks/useKpi';
import { useCreateAction } from '@/hooks/useAction';
import { DashboardKpiItem } from '@/components/items/DashboardKpiItem';
import { ActionItem } from '@/components/items/ActionItem';
import { Skeleton } from '@/components/ui/skeleton';
import { X } from 'lucide-react';

interface StrategyItemProps {
    strategyId: string;
    onStrategyDeleted?: (strategyId: string) => void;
}

/**
 * StrategyItem Component
 * Fetches and displays a single strategy with its dashboard KPIs and actions
 * Supports inline editing and deletion
 */
export function StrategyItem({
    strategyId,
    onStrategyDeleted,
}: StrategyItemProps) {
    const { isReadOnly } = useReadOnly();
    const {
        data: strategy,
        isLoading,
        isError,
        isFetching,
    } = useStrategy(strategyId);
    const updateStrategyMutation = useUpdateStrategy();
    const createKpiMutation = useCreateKPI();
    const createActionMutation = useCreateAction();
    const deleteStrategyMutation = useDeleteStrategy();

    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');
    const [pendingValue, setPendingValue] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
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
        if (
            isReadOnly ||
            updateStrategyMutation.isPending ||
            isFetching ||
            pendingValue
        )
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

    /**
     * Handle deleting the strategy
     */
    const handleDeleteStrategy = () => {
        deleteStrategyMutation.mutate(strategyId, {
            onSuccess: () => {
                // Notify parent to remove from OGSM
                onStrategyDeleted?.(strategyId);
            },
        });
    };

    /**
     * Handle Dashboard KPI deletion - remove from strategy's dashboardKpiIds
     */
    const handleKpiDeleted = (kpiId: string) => {
        if (!strategy) return;
        const updatedKpiIds = strategy.dashboardKpiIds.filter(
            (id: string) => id !== kpiId
        );
        updateStrategyMutation.mutate({
            id: strategyId,
            input: { dashboardKpiIds: updatedKpiIds },
        });
    };

    /**
     * Handle Action deletion - remove from strategy's actionIds
     */
    const handleActionDeleted = (actionId: string) => {
        if (!strategy) return;
        const updatedActionIds = strategy.actionIds.filter(
            (id: string) => id !== actionId
        );
        updateStrategyMutation.mutate({
            id: strategyId,
            input: { actionIds: updatedActionIds },
        });
    };

    // Loading state - skeleton UI to prevent layout shift
    if (isLoading) {
        return (
            <div className="shadow-sm">
                <div className="flex">
                    {/* Strategy Name Column - 25% */}
                    <div className="w-[25%] border-r border-border p-4">
                        <Skeleton className="h-5 w-full" />
                    </div>

                    {/* Dashboard KPIs Column - 25% */}
                    <div className="w-[25%] border-r border-border">
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
                            <div className="bg-muted/50">
                                <div className="border-t border-border py-2 pl-8 pr-4">
                                    <Skeleton className="h-5 w-3/4" />
                                </div>
                                <div className="border-t border-border py-2 pl-8 pr-4">
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
        <div
            className="relative shadow-sm"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex">
                {/* Strategy Name Column - 25% - Inline Editable */}
                <div className="relative w-[25%] border-r border-border p-4 pr-10">
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
                            className={`${
                                isReadOnly
                                    ? ''
                                    : 'cursor-pointer hover:opacity-70'
                            } text-sm font-medium ${
                                updateStrategyMutation.isPending || pendingValue
                                    ? 'opacity-50'
                                    : ''
                            }`}
                            title={isReadOnly ? '' : 'Click to edit'}
                        >
                            {pendingValue ||
                                (updateStrategyMutation.isPending
                                    ? localValue
                                    : strategy.name)}
                        </p>
                    )}

                    {/* Delete Button - Visible on Hover, Hidden in Edit Mode and Read-Only */}
                    {isHovered && !isEditing && !isReadOnly && (
                        <button
                            onClick={handleDeleteStrategy}
                            disabled={deleteStrategyMutation.isPending}
                            className="absolute right-2 top-4 text-muted-foreground hover:text-destructive disabled:opacity-50"
                            title="Delete strategy"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Dashboard KPIs Column - 25% */}
                <div
                    className="w-[25%] border-r border-border"
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
                                    onKpiDeleted={handleKpiDeleted}
                                />
                            ))}

                            {/* Add New KPI Input - Visible on Hover, Hidden in Read-Only */}
                            {isKpiHovered && !isReadOnly && (
                                <div className="border-t border-border p-4">
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
                                        className="w-full bg-transparent text-sm text-muted-foreground outline-none placeholder:text-muted-foreground focus:text-foreground"
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-4">
                            {isKpiHovered && !isReadOnly ? (
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
                                    className="w-full bg-transparent text-sm text-muted-foreground outline-none placeholder:text-muted-foreground focus:text-foreground"
                                />
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    No KPIs
                                </p>
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
                                            ? 'border-t border-border'
                                            : ''
                                    }
                                >
                                    <ActionItem
                                        actionId={actionId}
                                        onActionDeleted={handleActionDeleted}
                                    />
                                </div>
                            ))}

                            {/* Add New Action Input - Visible on Hover, Hidden in Read-Only */}
                            {isActionHovered && !isReadOnly && (
                                <div className="border-t border-border p-4">
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
                                        className="w-full bg-transparent text-sm font-medium text-muted-foreground outline-none placeholder:text-muted-foreground focus:text-foreground"
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-4">
                            {isActionHovered && !isReadOnly ? (
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
                                    className="w-full bg-transparent text-sm font-medium text-muted-foreground outline-none placeholder:text-muted-foreground focus:text-foreground"
                                />
                            ) : (
                                <p className="text-sm text-muted-foreground">
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
