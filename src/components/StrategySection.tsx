import { useState } from 'react';
import { useReadOnly } from '@/contexts/ReadOnlyContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StrategyItem } from '@/components/StrategyItem';
import { useCreateStrategy } from '@/hooks/useStrategy';
import { SectionHeader } from '@/components/SectionHeader';

interface StrategySectionProps {
    strategyIds: string[];
    onStrategyCreated?: (strategyId: string) => void;
    onStrategyDeleted?: (strategyId: string) => void;
}

/**
 * Strategy Section Component
 * Displays the strategies in a grid on the right side of the board
 */
export function StrategySection({
    strategyIds,
    onStrategyCreated,
    onStrategyDeleted,
}: StrategySectionProps) {
    const { isReadOnly } = useReadOnly();
    const [isHovered, setIsHovered] = useState(false);
    const [newStrategyName, setNewStrategyName] = useState('');
    const createStrategyMutation = useCreateStrategy();

    /**
     * Handle creating a new strategy
     */
    const handleCreateStrategy = () => {
        const trimmedName = newStrategyName.trim();
        if (!trimmedName) return;

        createStrategyMutation.mutate(
            {
                name: trimmedName,
                dashboardKpiIds: [],
                actionIds: [],
            },
            {
                onSuccess: (newStrategy) => {
                    // Clear input
                    setNewStrategyName('');
                    // Notify parent to update OGSM
                    onStrategyCreated?.(newStrategy.id);
                },
            }
        );
    };

    /**
     * Handle key down in input (Enter to submit, Escape to clear)
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCreateStrategy();
        } else if (e.key === 'Escape') {
            setNewStrategyName('');
        }
    };

    return (
        <div
            className="flex h-full flex-col rounded-lg border border-gray-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main Header - Strategy and Measures */}
            <div className="flex rounded-t-lg bg-blue-900 text-white">
                <div className="w-[25%] border-r border-white p-4">
                    <SectionHeader
                        initial="S"
                        label="Strategy"
                        description="High-level approaches or methods used to achieve your goals. Strategies define how you will accomplish your objectives and should be actionable and aligned with your goals."
                    />
                </div>
                <div className="w-[75%] p-4">
                    <SectionHeader
                        initial="M"
                        label="Measures"
                        description="Key Performance Indicators (KPIs) and actions that track progress and implementation of your strategies. Measures include both metrics to monitor performance and specific tasks to execute your plan."
                    />
                </div>
            </div>

            {/* Sub-header - Strategies, Dashboard, Actions */}
            <div className="flex border-b border-gray-300 bg-white text-sm">
                <div className="w-[25%] border-r border-gray-300 p-3">
                    <span className="font-medium text-black">Strategies</span>
                </div>
                <div className="w-[25%] border-r border-gray-300 p-3">
                    <span className="font-medium text-black">Dashboard</span>
                </div>
                <div className="w-[50%] p-3">
                    <span className="font-medium text-black">Actions</span>
                </div>
            </div>

            {/* Content Area - Scrollable Strategy List */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="flex flex-col gap-4">
                        {strategyIds.length > 0
                            ? strategyIds.map((strategyId) => (
                                  <StrategyItem
                                      key={strategyId}
                                      strategyId={strategyId}
                                      onStrategyDeleted={onStrategyDeleted}
                                  />
                              ))
                            : // Show empty state only in read-only mode or when input is not visible
                              (isReadOnly || !isHovered) && (
                                  <div className="p-8 text-center text-sm text-gray-500">
                                      No strategies yet. Add your first
                                      strategy!
                                  </div>
                              )}

                        {/* Add New Strategy Input - Visible on Hover, Hidden in Read-Only */}
                        {isHovered && !isReadOnly && (
                            <div className="shadow-sm">
                                <div className="flex">
                                    {/* Strategy Name Input - 25% */}
                                    <div className="w-[25%] border-r border-gray-200 p-4">
                                        <input
                                            type="text"
                                            value={newStrategyName}
                                            onChange={(e) =>
                                                setNewStrategyName(
                                                    e.target.value
                                                )
                                            }
                                            onKeyDown={handleKeyDown}
                                            onBlur={handleCreateStrategy}
                                            placeholder="Add a new Strategy"
                                            disabled={
                                                createStrategyMutation.isPending
                                            }
                                            className="w-full bg-transparent text-sm font-medium text-gray-400 outline-none placeholder:text-gray-400 focus:text-gray-900"
                                        />
                                    </div>

                                    {/* Placeholder columns */}
                                    <div className="w-[25%] border-r border-gray-200 p-4" />
                                    <div className="w-[50%] p-4" />
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
