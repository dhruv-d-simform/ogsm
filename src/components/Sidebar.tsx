import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Search, Plus, Trash2, Loader2 } from 'lucide-react';
import { useOGSMs } from '@/hooks/useOgsm';
import { CreateOgsmDialog } from '@/components/CreateOgsmDialog';

/**
 * Sidebar component with search, OGSM list, and create button
 */
export function Sidebar() {
    const [searchQuery, setSearchQuery] = useState('');
    const { id: selectedOgsmId } = useParams();

    // Fetch OGSM data using TanStack Query
    const { data: ogsms = [], isLoading, isError, error } = useOGSMs();

    /**
     * Handle clearing all data and resetting to mock data
     */
    const handleClearData = () => {
        // Clear all localStorage data
        localStorage.clear();

        // Redirect to home and force full page reload
        window.location.href = '/';
    };

    // Filter OGSM list based on search query
    const filteredOgsmList = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return ogsms;

        return ogsms.filter(
            (ogsm) =>
                ogsm.name.toLowerCase().includes(query) ||
                ogsm.objective.toLowerCase().includes(query)
        );
    }, [searchQuery, ogsms]);

    return (
        <aside className="flex h-screen w-80 flex-col border-r border-border bg-card">
            {/* Fixed Header - App Title with Clear Data Button */}
            <div className="shrink-0 border-b border-border px-6 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">OGSM</h1>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                title="Clear all data"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you sure you want to delete all the
                                    data?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    All of your current data will be deleted and
                                    mock data of around 10–15 OGSMs will be
                                    created.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleClearData}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    Delete All Data
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            {/* Fixed Search Bar */}
            <div className="shrink-0 border-b border-border px-4 py-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search OGSM plans..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchQuery(e.target.value)
                        }
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Scrollable OGSM List */}
            <ScrollArea className="flex-1 overflow-hidden">
                <div className="space-y-1 p-2">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            <p className="mt-3 text-sm text-muted-foreground">
                                Loading OGSM plans...
                            </p>
                        </div>
                    ) : isError ? (
                        <div className="px-4 py-8 text-center">
                            <p className="text-sm text-destructive">
                                Error loading OGSM plans
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {error instanceof Error
                                    ? error.message
                                    : 'Unknown error'}
                            </p>
                        </div>
                    ) : filteredOgsmList.length === 0 ? (
                        <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                            {searchQuery
                                ? 'No OGSM plans found'
                                : 'No OGSM plans yet. Create your first one!'}
                        </div>
                    ) : (
                        filteredOgsmList.map((ogsm) => {
                            const isSelected = selectedOgsmId === ogsm.id;
                            return (
                                <Link
                                    key={ogsm.id}
                                    to={`/ogsm/${ogsm.id}`}
                                    className={`block rounded-lg px-4 py-3 transition-colors ${
                                        isSelected
                                            ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                                    }`}
                                >
                                    <div className="font-medium">
                                        {ogsm.name}
                                    </div>
                                    <div
                                        className={`mt-1 line-clamp-2 text-sm ${
                                            isSelected
                                                ? 'text-blue-700 dark:text-blue-200'
                                                : 'text-muted-foreground'
                                        }`}
                                    >
                                        {ogsm.objective}
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            </ScrollArea>

            {/* Fixed Bottom - Create Button */}
            <div className="shrink-0 border-t border-border p-4">
                <CreateOgsmDialog>
                    <Button className="w-full" size="lg">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New OGSM
                    </Button>
                </CreateOgsmDialog>
            </div>
        </aside>
    );
}
