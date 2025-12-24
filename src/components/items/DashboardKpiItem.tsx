import { useState, useEffect } from 'react';
import { useReadOnly } from '@/contexts/ReadOnlyContext';
import { useKPI, useUpdateKPI, useDeleteKPI } from '@/hooks/useKpi';
import { Skeleton } from '@/components/ui/skeleton';
import { X, GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DashboardKpiItemProps {
    kpiId: string;
    showBorder?: boolean;
    onKpiDeleted?: (kpiId: string) => void;
}

/**
 * DashboardKpiItem Component
 * Fetches and displays a single KPI in the Dashboard column
 * Supports inline editing and deletion
 * Supports drag-and-drop reordering
 */
export function DashboardKpiItem({
    kpiId,
    showBorder = false,
    onKpiDeleted,
}: DashboardKpiItemProps) {
    const { isReadOnly } = useReadOnly();
    const { data: kpi, isLoading, isError, isFetching } = useKPI(kpiId);
    const updateKpiMutation = useUpdateKPI();
    const deleteKpiMutation = useDeleteKPI();

    // Sortable hook for drag-and-drop
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: kpiId, disabled: isReadOnly });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

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
        if (
            isReadOnly ||
            updateKpiMutation.isPending ||
            isFetching ||
            pendingValue
        )
            return;
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
                className={`p-4 ${showBorder ? 'border-t border-border' : ''}`}
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
            ref={setNodeRef}
            style={style}
            className={`relative overflow-visible p-4 pr-10 ${showBorder ? 'border-t border-border' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center gap-2">
                {/* Drag Handle - Positioned outside on the left with background and shadow */}
                {isHovered && !isReadOnly && (
                    <button
                        className="absolute h-full left-0 z-10 -translate-x-full cursor-grab rounded-l-md bg-card p-1 text-muted-foreground shadow-md hover:text-foreground active:cursor-grabbing"
                        {...attributes}
                        {...listeners}
                        aria-label="Drag to reorder"
                        onMouseEnter={() => setIsHovered(true)}
                    >
                        <GripVertical className="h-4 w-4" />
                    </button>
                )}
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
                        className={`flex-1 ${
                            isReadOnly ? '' : 'cursor-pointer hover:opacity-70'
                        } text-sm ${
                            updateKpiMutation.isPending || pendingValue
                                ? 'opacity-50'
                                : ''
                        }`}
                        title={isReadOnly ? '' : 'Click to edit'}
                    >
                        {pendingValue ||
                            (updateKpiMutation.isPending
                                ? localValue
                                : kpi.name)}
                    </p>
                )}
            </div>

            {/* Delete Button - Visible on Hover, Hidden in Edit Mode and Read-Only */}
            {isHovered && !isEditing && !isReadOnly && (
                <button
                    onClick={handleDeleteKpi}
                    disabled={deleteKpiMutation.isPending}
                    className="absolute right-2 top-2 text-muted-foreground hover:text-destructive disabled:opacity-50"
                    aria-label={`Delete dashboard KPI: ${kpi.name}`}
                >
                    <X className="h-3 w-3" aria-hidden="true" />
                </button>
            )}
        </div>
    );
}
