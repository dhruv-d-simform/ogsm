import { useKPI } from '@/hooks/useKpi';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardKpiItemProps {
    kpiId: string;
    showBorder?: boolean;
}

/**
 * DashboardKpiItem Component
 * Fetches and displays a single KPI in the Dashboard column
 */
export function DashboardKpiItem({
    kpiId,
    showBorder = false,
}: DashboardKpiItemProps) {
    const { data: kpi, isLoading, isError } = useKPI(kpiId);

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

    // Success state - render KPI
    return (
        <div className={`p-4 ${showBorder ? 'border-t border-gray-200' : ''}`}>
            <p className="text-sm">{kpi.name}</p>
        </div>
    );
}
