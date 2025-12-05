import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StrategyItem } from '@/components/StrategyItem';
import { useCreateStrategy } from '@/hooks/useStrategy';

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
                    <h2 className="text-lg font-semibold">Strategy</h2>
                </div>
                <div className="w-[75%] p-4">
                    <h2 className="text-lg font-semibold">Measures</h2>
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
                        {strategyIds.length > 0 ? (
                            strategyIds.map((strategyId) => (
                                <StrategyItem
                                    key={strategyId}
                                    strategyId={strategyId}
                                    onStrategyDeleted={onStrategyDeleted}
                                />
                            ))
                        ) : (
                            <div className="p-8 text-center text-sm text-gray-500">
                                No strategies yet. Add your first strategy!
                            </div>
                        )}

                        {/* Add New Strategy Input - Visible on Hover */}
                        {isHovered && (
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
