import type { OGSM } from '@/types';

interface OgsmBoardProps {
    ogsm: OGSM;
}

/**
 * Main board component for OGSM
 * Displays the OGSM objectives, goals, strategies, and measures
 * Currently a placeholder for future implementation
 */
export function OgsmBoard({ ogsm }: OgsmBoardProps) {
    return (
        <main className="flex-1 overflow-auto bg-muted/20 p-8">
            <div className="flex h-full items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-muted-foreground">
                        Main board content will be implemented here
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        OGSM ID: {ogsm.id}
                    </p>
                </div>
            </div>
        </main>
    );
}
