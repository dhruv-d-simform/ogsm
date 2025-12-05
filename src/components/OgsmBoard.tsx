import type { OGSM } from '@/types';
import { ObjectiveSection } from '@/components/ObjectiveSection';
import { GoalsSection } from '@/components/GoalsSection';
import { StrategySection } from '@/components/StrategySection';
import { useUpdateOGSM } from '@/hooks/useOgsm';

interface OgsmBoardProps {
    ogsm: OGSM;
    onObjectiveChange?: (newObjective: string) => void;
}

/**
 * Main board component for OGSM
 * Displays the OGSM objectives, goals, strategies, and measures
 */
export function OgsmBoard({ ogsm, onObjectiveChange }: OgsmBoardProps) {
    const updateOgsmMutation = useUpdateOGSM();

    /**
     * Handle new goal creation - add goal ID to OGSM
     */
    const handleGoalCreated = (goalId: string) => {
        updateOgsmMutation.mutate({
            id: ogsm.id,
            input: {
                goalIds: [...ogsm.goalIds, goalId],
            },
        });
    };

    /**
     * Handle new strategy creation - add strategy ID to OGSM
     */
    const handleStrategyCreated = (strategyId: string) => {
        updateOgsmMutation.mutate({
            id: ogsm.id,
            input: {
                strategyIds: [...ogsm.strategyIds, strategyId],
            },
        });
    };

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
                        <GoalsSection
                            goalIds={ogsm.goalIds}
                            onGoalCreated={handleGoalCreated}
                        />
                    </div>

                    {/* Strategy Section - 80% width */}
                    <div className="w-[80%]">
                        <StrategySection
                            strategyIds={ogsm.strategyIds}
                            onStrategyCreated={handleStrategyCreated}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
