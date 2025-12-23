import { pdf } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import { getGoalById } from '@/api/goals';
import { getStrategyById } from '@/api/strategies';
import { getKPIById } from '@/api/kpis';
import { getActionById } from '@/api/actions';
import { getTaskById } from '@/api/tasks';
import type { OGSM, Goal, Strategy, KPI, Action, Task } from '@/types';
import { tryCatch } from '@/utils/tryCatch';

/**
 * Hook to export OGSM data as PDF
 * Fetches all related data (goals, strategies, KPIs, actions, tasks)
 * and generates a downloadable PDF document
 */
export function usePdfExport(ogsm: OGSM | undefined) {
    /**
     * Fetch all goals
     */
    const goalsQuery = useQuery({
        queryKey: ['goals', ogsm?.goalIds],
        queryFn: async () => {
            if (!ogsm?.goalIds || ogsm.goalIds.length === 0) return [];
            const goals = await Promise.all(
                ogsm.goalIds.map((id) => getGoalById(id))
            );
            return goals.filter(
                (goal: Goal | null): goal is Goal => goal !== null
            );
        },
        enabled: !!ogsm && ogsm.goalIds.length > 0,
    });

    /**
     * Fetch all strategies
     */
    const strategiesQuery = useQuery({
        queryKey: ['strategies', ogsm?.strategyIds],
        queryFn: async () => {
            if (!ogsm?.strategyIds || ogsm.strategyIds.length === 0) return [];
            const strategies = await Promise.all(
                ogsm.strategyIds.map((id) => getStrategyById(id))
            );
            return strategies.filter(
                (strategy: Strategy | null): strategy is Strategy =>
                    strategy !== null
            );
        },
        enabled: !!ogsm && ogsm.strategyIds.length > 0,
    });

    /**
     * Collect all KPI IDs from goals and strategies
     */
    const allKpiIds = [
        ...(goalsQuery.data?.flatMap((g: Goal) => g.kpiIds) || []),
        ...(strategiesQuery.data?.flatMap((s: Strategy) => s.dashboardKpiIds) ||
            []),
    ];

    /**
     * Fetch all KPIs
     */
    const kpisQuery = useQuery({
        queryKey: ['kpis', allKpiIds],
        queryFn: async () => {
            if (allKpiIds.length === 0) return [];
            const uniqueKpiIds = [...new Set(allKpiIds)];
            const kpis = await Promise.all(
                uniqueKpiIds.map((id) => getKPIById(id))
            );
            return kpis.filter((kpi: KPI | null): kpi is KPI => kpi !== null);
        },
        enabled: allKpiIds.length > 0,
    });

    /**
     * Collect all action IDs from strategies
     */
    const allActionIds =
        strategiesQuery.data?.flatMap((s: Strategy) => s.actionIds) || [];

    /**
     * Fetch all actions
     */
    const actionsQuery = useQuery({
        queryKey: ['actions', allActionIds],
        queryFn: async () => {
            if (allActionIds.length === 0) return [];
            const uniqueActionIds = [...new Set(allActionIds)];
            const actions = await Promise.all(
                uniqueActionIds.map((id) => getActionById(id))
            );
            return actions.filter(
                (action: Action | null): action is Action => action !== null
            );
        },
        enabled: allActionIds.length > 0,
    });

    /**
     * Collect all task IDs from actions
     */
    const allTaskIds =
        actionsQuery.data?.flatMap((a: Action) => a.taskIds) || [];

    /**
     * Fetch all tasks
     */
    const tasksQuery = useQuery({
        queryKey: ['tasks', allTaskIds],
        queryFn: async () => {
            if (allTaskIds.length === 0) return [];
            const uniqueTaskIds = [...new Set(allTaskIds)];
            const tasks = await Promise.all(
                uniqueTaskIds.map((id) => getTaskById(id))
            );
            return tasks.filter(
                (task: Task | null): task is Task => task !== null
            );
        },
        enabled: allTaskIds.length > 0,
    });

    /**
     * Check if all data is loaded
     */
    const isLoading =
        goalsQuery.isLoading ||
        strategiesQuery.isLoading ||
        kpisQuery.isLoading ||
        actionsQuery.isLoading ||
        tasksQuery.isLoading;

    const isError =
        goalsQuery.isError ||
        strategiesQuery.isError ||
        kpisQuery.isError ||
        actionsQuery.isError ||
        tasksQuery.isError;

    /**
     * Generate and download PDF
     */
    const exportPdf = async (pdfComponent: React.ReactElement) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [blob, error] = await tryCatch(pdf(pdfComponent as any).toBlob());

        if (error || !blob) {
            console.error('Failed to generate PDF:', error);
            return;
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${ogsm?.name || 'OGSM'}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return {
        goals: goalsQuery.data || [],
        strategies: strategiesQuery.data || [],
        kpis: kpisQuery.data || [],
        actions: actionsQuery.data || [],
        tasks: tasksQuery.data || [],
        isLoading,
        isError,
        exportPdf,
    };
}
