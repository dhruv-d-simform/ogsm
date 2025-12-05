import { ScrollArea } from '@/components/ui/scroll-area';
import { StrategyItem } from '@/components/StrategyItem';

interface StrategySectionProps {
    strategyIds: string[];
}

/**
 * Strategy Section Component
 * Displays the strategies on the right side of the board
 */
export function StrategySection({ strategyIds }: StrategySectionProps) {
    return (
        <div className="flex h-full flex-col rounded-lg border border-gray-300">
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
                                />
                            ))
                        ) : (
                            <div className="p-8 text-center text-sm text-gray-500">
                                No strategies yet. Add your first strategy!
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
