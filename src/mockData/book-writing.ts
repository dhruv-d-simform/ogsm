/**
 * OGSM: Book Writing Journey
 * An aspiring author writing and publishing their first book
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';

export const createBookWritingData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
) => {
    const now = getCurrentTimestamp();

    const tasks: Task[] = [
        // Writing Phase
        {
            id: generateId(),
            name: 'Outline complete book structure',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Write 1000 words daily',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Complete first draft (60,000 words)',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Join writing accountability group',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },

        // Editing & Refinement
        {
            id: generateId(),
            name: 'Self-edit first draft',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Get feedback from beta readers',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Hire professional editor',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Complete final revisions',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Publishing Preparation
        {
            id: generateId(),
            name: 'Research publishing options',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Design book cover',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Format for Kindle and print',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Write compelling book description',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Launch & Marketing
        {
            id: generateId(),
            name: 'Build author website and email list',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create launch day promotion plan',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Reach out to book reviewers',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Plan book launch event',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Write Consistently',
            description: 'Develop daily writing habit and complete draft',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Polish Manuscript',
            description: 'Refine writing to professional quality',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Prepare for Publication',
            description: 'Handle all publishing logistics',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Launch Successfully',
            description: 'Market book and reach readers',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const kpis: KPI[] = [
        {
            id: generateId(),
            name: 'Words Written',
            target: 60000,
            current: 22000,
            unit: 'words',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Writing Days (Streak)',
            target: 180,
            current: 42,
            unit: 'days',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Chapters Completed',
            target: 20,
            current: 8,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Beta Reader Feedback Score',
            target: 4.5,
            current: 0,
            unit: '/5',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Books Sold',
            target: 1000,
            current: 0,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Amazon Reviews',
            target: 50,
            current: 0,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Email Subscribers',
            target: 500,
            current: 85,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Book Rating',
            target: 4.3,
            current: 0,
            unit: '/5',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Author Satisfaction',
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
            name: 'Complete 60,000 Word Manuscript',
            description: 'Finish first draft within 6 months',
            kpiIds: [kpis[0].id, kpis[1].id, kpis[2].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Publish Professional Quality Book',
            description: 'Release well-edited, polished book',
            kpiIds: [kpis[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Sell 1,000 Copies in First Year',
            description: 'Reach meaningful audience and get feedback',
            kpiIds: [kpis[4].id, kpis[5].id, kpis[6].id, kpis[7].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'Daily Writing Discipline',
            description: 'Write every day without excuses',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[0].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Professional Quality Focus',
            description: 'Invest in editing and professional presentation',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[1].id, actions[2].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Reader-First Marketing',
            description: 'Build audience and engage with readers',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[3].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const ogsm: OGSM = {
        id: generateId(),
        name: 'Book Writing Journey',
        objective:
            'Write, publish, and successfully launch my first book within 12 months, selling 1,000 copies and establishing myself as a published author while sharing my story with the world.',
        goalIds: goals.map((g) => g.id),
        strategyIds: strategies.map((s) => s.id),
        createdAt: now,
        updatedAt: now,
    };

    return { ogsm, goals, strategies, actions, tasks, kpis };
};
