/**
 * PDF Export API
 * Provides a single endpoint to fetch all data needed for PDF generation
 */

import type { OGSM, Goal, Strategy, KPI, Action, Task } from '@/types';
import {
    STORAGE_KEYS,
    readFromStorage,
    simulateApiDelay,
} from '@/utils/storage';
import { tryCatch } from '@/utils/tryCatch';

/**
 * Complete OGSM data for PDF export
 */
export interface OgsmPdfData {
    goals: Goal[];
    strategies: Strategy[];
    kpis: KPI[];
    actions: Action[];
    tasks: Task[];
}

/**
 * Get all data needed for PDF export in a single query
 * Fetches goals, strategies, KPIs, actions, and tasks related to an OGSM
 * Reads directly from storage for optimal performance
 */
export const getOgsmPdfData = async (ogsm: OGSM): Promise<OgsmPdfData> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            // Read all data from storage in one go
            const allGoals = readFromStorage<Goal>(STORAGE_KEYS.GOALS);
            const allStrategies = readFromStorage<Strategy>(
                STORAGE_KEYS.STRATEGIES
            );
            const allKpis = readFromStorage<KPI>(STORAGE_KEYS.KPIS);
            const allActions = readFromStorage<Action>(STORAGE_KEYS.ACTIONS);
            const allTasks = readFromStorage<Task>(STORAGE_KEYS.TASKS);

            // Filter goals by OGSM goalIds
            const goals = allGoals.filter((g) => ogsm.goalIds.includes(g.id));

            // Filter strategies by OGSM strategyIds
            const strategies = allStrategies.filter((s) =>
                ogsm.strategyIds.includes(s.id)
            );

            // Collect all KPI IDs from goals and strategies
            const kpiIds = [
                ...goals.flatMap((g) => g.kpiIds),
                ...strategies.flatMap((s) => s.dashboardKpiIds),
            ];
            const uniqueKpiIds = new Set(kpiIds);

            // Filter KPIs
            const kpis = allKpis.filter((k) => uniqueKpiIds.has(k.id));

            // Collect all action IDs from strategies
            const actionIds = strategies.flatMap((s) => s.actionIds);
            const uniqueActionIds = new Set(actionIds);

            // Filter actions
            const actions = allActions.filter((a) => uniqueActionIds.has(a.id));

            // Collect all task IDs from actions
            const taskIds = actions.flatMap((a) => a.taskIds);
            const uniqueTaskIds = new Set(taskIds);

            // Filter tasks
            const tasks = allTasks.filter((t) => uniqueTaskIds.has(t.id));

            return {
                goals,
                strategies,
                kpis,
                actions,
                tasks,
            };
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch OGSM PDF data: ${error.message}`);
    }

    return result;
};
