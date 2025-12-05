import { useState, useEffect } from 'react';
import { useKPI, useUpdateKPI } from '@/hooks/useKpi';
import { Skeleton } from '@/components/ui/skeleton';

interface KPIItemProps {
    kpiId: string;
}

/**
 * KPIItem Component
 * Fetches and displays a single KPI by its ID
 * Supports inline editing
 */
export function KPIItem({ kpiId }: KPIItemProps) {
    const { data: kpi, isLoading, isError } = useKPI(kpiId);
    const updateKpiMutation = useUpdateKPI();

    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState('');

    /**
     * Sync local state when kpi data changes
     */
    useEffect(() => {
        if (kpi) {
            setLocalValue(kpi.name);
        }
    }, [kpi]);

    /**
     * Handle click to enter edit mode
     * Initialize local value with current KPI name when entering edit mode
     * Prevent editing if mutation is in progress
     */
    const handleClick = () => {
        if (updateKpiMutation.isPending) return;
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
            <div className="border-t border-gray-200 py-2 pl-6 pr-3">
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
        <div className="border-t border-gray-200 py-2 pl-6 pr-3">
            {isEditing ? (
                <input
                    type="text"
                    value={localValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="w-full bg-transparent text-sm text-gray-600 outline-none"
                />
            ) : (
                <p
                    onClick={handleClick}
                    className={`cursor-pointer text-sm text-gray-600 hover:opacity-70 ${
                        updateKpiMutation.isPending ? 'opacity-50' : ''
                    }`}
                    title="Click to edit"
                >
                    {updateKpiMutation.isPending ? localValue : kpi.name}
                </p>
            )}
        </div>
    );
}
