import { useRef, useState, useEffect } from 'react';
import type { OGSM } from '@/types';
import { ObjectiveSection } from '@/components/sections/ObjectiveSection';
import { GoalsSection } from '@/components/sections/GoalsSection';
import { StrategySection } from '@/components/sections/StrategySection';
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
    const boardRef = useRef<HTMLElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    /**
     * Handle fullscreen state changes
     */
    useEffect(() => {
        const abortController = new AbortController();

        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange, {
            signal: abortController.signal,
        });

        return () => {
            abortController.abort();
        };
    }, []);

    /**
     * Toggle fullscreen mode using the Fullscreen API
     */
    const handleToggleFullscreen = async () => {
        if (!boardRef.current) return;

        try {
            if (!document.fullscreenElement) {
                await boardRef.current.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (error) {
            console.error('Error toggling fullscreen:', error);
        }
    };
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

    /**
     * Handle goal deletion - remove goal ID from OGSM
     */
    const handleGoalDeleted = (goalId: string) => {
        const updatedGoalIds = ogsm.goalIds.filter(
            (id: string) => id !== goalId
        );
        updateOgsmMutation.mutate({
            id: ogsm.id,
            input: {
                goalIds: updatedGoalIds,
            },
        });
    };

    /**
     * Handle strategy deletion - remove strategy ID from OGSM
     */
    const handleStrategyDeleted = (strategyId: string) => {
        const updatedStrategyIds = ogsm.strategyIds.filter(
            (id: string) => id !== strategyId
        );
        updateOgsmMutation.mutate({
            id: ogsm.id,
            input: {
                strategyIds: updatedStrategyIds,
            },
        });
    };

    return (
        <main
            ref={boardRef}
            className="flex flex-1 flex-col overflow-hidden bg-muted/20 p-8"
        >
            <div className="flex min-h-0 flex-1 flex-col gap-6">
                {/* Objective Section */}
                <ObjectiveSection
                    objective={ogsm.objective}
                    onObjectiveChange={onObjectiveChange}
                    isFullscreen={isFullscreen}
                    onToggleFullscreen={handleToggleFullscreen}
                />

                {/* Goals and Strategy Sections - Side by Side */}
                <div className="flex min-h-0 flex-1 gap-6">
                    {/* Goals Section - 20% width */}
                    <div className="w-[20%]">
                        <GoalsSection
                            goalIds={ogsm.goalIds}
                            onGoalCreated={handleGoalCreated}
                            onGoalDeleted={handleGoalDeleted}
                        />
                    </div>

                    {/* Strategy Section - 80% width */}
                    <div className="w-[80%]">
                        <StrategySection
                            strategyIds={ogsm.strategyIds}
                            onStrategyCreated={handleStrategyCreated}
                            onStrategyDeleted={handleStrategyDeleted}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
