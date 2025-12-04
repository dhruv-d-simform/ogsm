import { useParams } from 'react-router';

/**
 * OGSM detail page - placeholder for now
 */
export function OgsmDetailPage() {
    const { id } = useParams();

    return (
        <div className="flex h-full items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground">
                    OGSM Board
                </h1>
                <p className="mt-2 text-muted-foreground">
                    OGSM ID: {id || 'None selected'}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">
                    Placeholder for the main OGSM board
                </p>
            </div>
        </div>
    );
}
