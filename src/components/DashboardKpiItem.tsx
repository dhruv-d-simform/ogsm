import { useState, useEffect } from 'react';
import { useKPI, useUpdateKPI } from '@/hooks/useKpi';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardKpiItemProps {
    kpiId: string;
    showBorder?: boolean;
}

/**
 * DashboardKpiItem Component
 * Fetches and displays a single KPI in the Dashboard column
 * Supports inline editing
 */
export function DashboardKpiItem({
    kpiId,
    showBorder = false,
}: DashboardKpiItemProps) {
    const { data: kpi, isLoading, isError, isFetching } = useKPI(kpiId);
    const updateKpiMutation = useUpdateKPI();

    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');
    const [pendingValue, setPendingValue] = useState<string | null>(null);

    /**
     * Sync local state when kpi data changes and no mutation is pending
     */
    useEffect(() => {
        if (kpi && !isFetching && !updateKpiMutation.isPending) {
            setLocalValue(kpi.name);
            setPendingValue(null);
        }
    }, [kpi, isFetching, updateKpiMutation.isPending]);

    /**
     * Handle click to enter edit mode
     * Initialize local value with current KPI name when entering edit mode
     * Prevent editing if mutation is in progress or data is being refetched
     */
    const handleClick = () => {
        if (updateKpiMutation.isPending || isFetching || pendingValue) return;
        if (kpi) {
            setLocalValue(kpi.name);
        }
        setIsEditing(true);
    };

    /**
     * Handle blur to save and exit edit mode
     */
    const handleBlur = () => {
        const trimmedValue = localValue.trim();
        if (trimmedValue && trimmedValue !== kpi?.name) {
            // Store the new value to show during refetch
            setPendingValue(trimmedValue);
            // Optimistic update
            updateKpiMutation.mutate({
                id: kpiId,
                input: { name: trimmedValue },
            });
        } else if (kpi) {
            setLocalValue(kpi.name);
        }
        setIsEditing(false);
    };

    /**
     * Handle input change
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    };

    /**
     * Handle key down (Enter to save, Escape to cancel)
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBlur();
        } else if (e.key === 'Escape') {
            if (kpi) {
                setLocalValue(kpi.name);
            }
            setIsEditing(false);
        }
    };

    // Loading state - skeleton UI to prevent layout shift
    if (isLoading) {
        return (
            <div
                className={`p-4 ${showBorder ? 'border-t border-gray-200' : ''}`}
            >
                <Skeleton className="h-5 w-3/4" />
            </div>
        );
    }

    // Error or not found - don't render anything
    if (isError || !kpi) {
        return null;
    }

    // Success state - render KPI with inline editing
    return (
        <div className={`p-4 ${showBorder ? 'border-t border-gray-200' : ''}`}>
            {isEditing ? (
                <input
                    type="text"
                    value={localValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-full bg-transparent text-sm outline-none"
                />
            ) : (
                <p
                    onClick={handleClick}
                    className={`cursor-pointer text-sm hover:opacity-70 ${
                        updateKpiMutation.isPending || pendingValue
                            ? 'opacity-50'
                            : ''
                    }`}
                    title="Click to edit"
                >
                    {pendingValue ||
                        (updateKpiMutation.isPending ? localValue : kpi.name)}
                </p>
            )}
        </div>
    );
}
