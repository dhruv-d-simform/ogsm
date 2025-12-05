import { useState, useEffect } from 'react';
import { useKPI, useUpdateKPI, useDeleteKPI } from '@/hooks/useKpi';
import { Skeleton } from '@/components/ui/skeleton';
import { X } from 'lucide-react';

interface DashboardKpiItemProps {
    kpiId: string;
    showBorder?: boolean;
    onKpiDeleted?: (kpiId: string) => void;
}

/**
 * DashboardKpiItem Component
 * Fetches and displays a single KPI in the Dashboard column
 * Supports inline editing and deletion
 */
export function DashboardKpiItem({
    kpiId,
    showBorder = false,
    onKpiDeleted,
}: DashboardKpiItemProps) {
    const { data: kpi, isLoading, isError, isFetching } = useKPI(kpiId);
    const updateKpiMutation = useUpdateKPI();
    const deleteKpiMutation = useDeleteKPI();

    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');
    const [pendingValue, setPendingValue] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);

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

    /**
     * Handle deleting the KPI
     */
    const handleDeleteKpi = () => {
        deleteKpiMutation.mutate(kpiId, {
            onSuccess: () => {
                // Notify parent to remove from strategy
                onKpiDeleted?.(kpiId);
            },
        });
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
        <div
            className={`relative p-4 pr-10 ${showBorder ? 'border-t border-gray-200' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
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

            {/* Delete Button - Visible on Hover, Hidden in Edit Mode */}
            {isHovered && !isEditing && (
                <button
                    onClick={handleDeleteKpi}
                    disabled={deleteKpiMutation.isPending}
                    className="absolute right-2 top-4 text-gray-400 hover:text-red-600 disabled:opacity-50"
                    title="Delete KPI"
                >
                    <X className="h-3 w-3" />
                </button>
            )}
        </div>
    );
}
