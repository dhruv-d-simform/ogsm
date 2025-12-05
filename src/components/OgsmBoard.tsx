import type { OGSM } from '@/types';
import { ObjectiveSection } from '@/components/ObjectiveSection';
import { GoalsSection } from '@/components/GoalsSection';
import { StrategySection } from '@/components/StrategySection';

interface OgsmBoardProps {
    ogsm: OGSM;
    onObjectiveChange?: (newObjective: string) => void;
}

/**
 * Main board component for OGSM
 * Displays the OGSM objectives, goals, strategies, and measures
 */
export function OgsmBoard({ ogsm, onObjectiveChange }: OgsmBoardProps) {
    return (
        <main className="flex flex-1 flex-col overflow-hidden bg-muted/20 p-8">
            <div className="flex min-h-0 flex-1 flex-col gap-6">
                {/* Objective Section */}
                <ObjectiveSection
                    objective={ogsm.objective}
                    onObjectiveChange={onObjectiveChange}
                />

                {/* Goals and Strategy Sections - Side by Side */}
                <div className="flex min-h-0 flex-1 gap-6">
                    {/* Goals Section - 20% width */}
                    <div className="w-[20%]">
                        <GoalsSection goalIds={ogsm.goalIds} />
                    </div>

                    {/* Strategy Section - 80% width */}
                    <div className="w-[80%]">
                        <StrategySection strategyIds={ogsm.strategyIds} />
                    </div>
                </div>
            </div>
        </main>
    );
}
