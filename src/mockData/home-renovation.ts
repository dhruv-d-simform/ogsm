/**
 * OGSM: Home Renovation Project
 * A homeowner planning a major kitchen and bathroom renovation
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';

export const createHomeRenovationData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
) => {
    const now = getCurrentTimestamp();

    const tasks: Task[] = [
        // Planning Phase
        {
            id: generateId(),
            name: 'Create detailed renovation wishlist',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Get 3 contractor quotes',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Select contractor and sign contract',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Apply for necessary permits',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Design Decisions
        {
            id: generateId(),
            name: 'Choose kitchen cabinet style and color',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Select countertop material',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Pick bathroom fixtures and tiles',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Decide on lighting fixtures',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Budget Management
        {
            id: generateId(),
            name: 'Create detailed project budget',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Set aside 20% contingency fund',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Track expenses in spreadsheet',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Review and approve change orders',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Execution
        {
            id: generateId(),
            name: 'Set up temporary kitchen area',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Weekly contractor check-ins',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Inspect work at each milestone',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Complete final walkthrough',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Plan Thoroughly',
            description: 'Define scope and hire right professionals',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Make Design Choices',
            description: 'Select all materials and finishes',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Control Costs',
            description: 'Stay within budget throughout project',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Manage Project',
            description: 'Oversee construction and quality',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const kpis: KPI[] = [
        {
            id: generateId(),
            name: 'Project Completion',
            target: 100,
            current: 15,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Days to Completion',
            target: 90,
            current: 90,
            unit: 'days',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Budget Spent',
            target: 45000,
            current: 5000,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Budget Remaining',
            target: 0,
            current: 40000,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Quality Issues Found',
            target: 0,
            current: 0,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Design Decisions Made',
            target: 25,
            current: 8,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Home Value Increase',
            target: 60000,
            current: 0,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Overall Satisfaction',
            target: 9,
            current: 7,
            unit: '/10',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const goals: Goal[] = [
        {
            id: generateId(),
            name: 'Complete Within 90 Days',
            description: 'Finish renovation in planned timeframe',
            kpiIds: [kpis[0].id, kpis[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Stay Under $45K Budget',
            description: 'Complete project without overspending',
            kpiIds: [kpis[2].id, kpis[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Achieve Dream Home Design',
            description: 'Create beautiful, functional spaces we love',
            kpiIds: [kpis[4].id, kpis[5].id, kpis[6].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'Detailed Pre-Planning',
            description: 'Make all decisions before construction starts',
            dashboardKpiIds: [kpis[7].id],
            actionIds: [actions[0].id, actions[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Rigorous Budget Control',
            description: 'Track every expense and avoid scope creep',
            dashboardKpiIds: [kpis[7].id],
            actionIds: [actions[2].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Active Project Management',
            description: 'Stay involved and catch issues early',
            dashboardKpiIds: [kpis[7].id],
            actionIds: [actions[3].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const ogsm: OGSM = {
        id: generateId(),
        name: 'Home Renovation Project',
        objective:
            'Successfully renovate our kitchen and bathroom within 90 days and $45,000 budget, creating beautiful, functional spaces that increase our home value and improve our daily living experience.',
        goalIds: goals.map((g) => g.id),
        strategyIds: strategies.map((s) => s.id),
        createdAt: now,
        updatedAt: now,
    };

    return { ogsm, goals, strategies, actions, tasks, kpis };
};
