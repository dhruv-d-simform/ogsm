import { useParams } from 'react-router';
import { useEffect } from 'react';
import { Loader2, AlertCircle, FileQuestion } from 'lucide-react';
import { OgsmHeader } from '@/components/ogsm/OgsmHeader';
import { OgsmBoard } from '@/components/ogsm/OgsmBoard';
import { useOGSM, useUpdateOGSM } from '@/hooks/useOgsm';
import { Button } from '@/components/ui/button';
import { ReadOnlyProvider } from '@/contexts/ReadOnlyContext';

/**
 * OGSM detail page - displays the main area with header and board
 * Fetches real OGSM data based on URL params
 */
export function OgsmDetailPage() {
    const { id } = useParams<{ id: string }>();

    // Fetch OGSM data using TanStack Query
    const { data: ogsm, isLoading, isError, error } = useOGSM(id || '');

    // Update page title when OGSM data is loaded
    useEffect(() => {
        if (ogsm?.name) {
            document.title = ogsm.name;
        }

        // Cleanup: reset to default title when component unmounts
        return () => {
            document.title = 'OGSM';
        };
    }, [ogsm?.name]);

    // Mutation hook for updating OGSM
    const updateOgsmMutation = useUpdateOGSM();

    /**
     * Handle OGSM name change
     */
    const handleNameChange = (newName: string) => {
        if (!id || !ogsm) return;

        updateOgsmMutation.mutate({
            id,
            input: { name: newName },
        });
    };

    /**
     * Handle OGSM objective change
     */
    const handleObjectiveChange = (newObjective: string) => {
        if (!id || !ogsm) return;

        updateOgsmMutation.mutate({
            id,
            input: { objective: newObjective },
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <div
                className="flex h-full flex-col items-center justify-center bg-muted/20"
                role="status"
                aria-busy="true"
            >
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-lg text-muted-foreground">
                    Loading OGSM...
                </p>
            </div>
        );
    }

    // Error state - 404 Not Found
    if (
        isError &&
        error instanceof Error &&
        error.message.includes('not found')
    ) {
        return (
            <div
                className="flex h-full flex-col items-center justify-center bg-muted/20 px-8"
                role="alert"
            >
                <div className="flex max-w-md flex-col items-center text-center">
                    <FileQuestion
                        className="h-20 w-20 text-muted-foreground"
                        aria-hidden="true"
                    />
                    <h2 className="mt-6 text-2xl font-bold text-foreground">
                        OGSM Not Found
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        The OGSM plan you're looking for doesn't exist or may
                        have been deleted.
                    </p>
                    <Button
                        className="mt-6"
                        onClick={() => (window.location.href = '/')}
                    >
                        Go to Home
                    </Button>
                </div>
            </div>
        );
    }

    // Generic error state
    if (isError) {
        return (
            <div
                className="flex h-full flex-col items-center justify-center bg-muted/20 px-8"
                role="alert"
            >
                <div className="flex max-w-md flex-col items-center text-center">
                    <AlertCircle
                        className="h-20 w-20 text-destructive"
                        aria-hidden="true"
                    />
                    <h2 className="mt-6 text-2xl font-bold text-foreground">
                        Error Loading OGSM
                    </h2>
                    <p className="mt-3 text-muted-foreground">
                        {error instanceof Error
                            ? error.message
                            : 'An unexpected error occurred while loading the OGSM plan.'}
                    </p>
                    <div className="mt-6 flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => window.location.reload()}
                        >
                            Retry
                        </Button>
                        <Button onClick={() => (window.location.href = '/')}>
                            Go to Home
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Data not available (shouldn't happen if query is configured correctly)
    if (!ogsm) {
        return (
            <div className="flex h-full flex-col items-center justify-center bg-muted/20">
                <p className="text-muted-foreground">No OGSM data available.</p>
            </div>
        );
    }

    // Success state - render OGSM with header
    return (
        <ReadOnlyProvider>
            <div className="flex h-full flex-col">
                <OgsmHeader name={ogsm.name} onNameChange={handleNameChange} />
                <OgsmBoard
                    ogsm={ogsm}
                    onObjectiveChange={handleObjectiveChange}
                />
            </div>
        </ReadOnlyProvider>
    );
}
