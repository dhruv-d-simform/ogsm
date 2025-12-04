import type { OGSM } from '@/types';
import { ObjectiveSection } from '@/components/ObjectiveSection';
import { GoalsSection } from '@/components/GoalsSection';
import { StrategySection } from '@/components/StrategySection';

interface OgsmBoardProps {
    ogsm: OGSM;
}

/**
 * Main board component for OGSM
 * Displays the OGSM objectives, goals, strategies, and measures
 */
export function OgsmBoard({ ogsm: _ogsm }: OgsmBoardProps) {
    return (
        <main className="flex-1 overflow-auto bg-muted/20 p-8">
            <div className="flex h-full flex-col gap-6">
                {/* Objective Section */}
                <ObjectiveSection />

                {/* Goals and Strategy Sections - Side by Side */}
                <div className="flex flex-1 gap-6">
                    {/* Goals Section - 20% width */}
                    <div className="w-[20%]">
                        <GoalsSection />
                    </div>

                    {/* Strategy Section - 80% width */}
                    <div className="w-[80%]">
                        <StrategySection />
                    </div>
                </div>
            </div>
        </main>
    );
}
