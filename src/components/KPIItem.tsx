import { useKPI } from '@/hooks/useKpi';
import { Skeleton } from '@/components/ui/skeleton';

interface KPIItemProps {
    kpiId: string;
}

/**
 * KPIItem Component
 * Fetches and displays a single KPI by its ID
 */
export function KPIItem({ kpiId }: KPIItemProps) {
    const { data: kpi, isLoading, isError } = useKPI(kpiId);

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

    // Success state - render KPI
    return (
        <div className="border-t border-gray-200 py-2 pl-6 pr-3">
            <p className="text-sm text-gray-600">{kpi.name}</p>
        </div>
    );
}
