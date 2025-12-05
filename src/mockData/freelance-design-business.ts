/**
 * OGSM: Freelance Design Business
 * A designer building a successful freelance business
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';

export const createFreelanceDesignBusinessData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
) => {
    const now = getCurrentTimestamp();

    const tasks: Task[] = [
        // Portfolio & Brand
        {
            id: generateId(),
            name: 'Create professional portfolio website',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Showcase 10 best projects',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Design personal brand identity',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Write compelling case studies',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Client Acquisition
        {
            id: generateId(),
            name: 'Set up profiles on Upwork and Fiverr',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Send 20 cold outreach emails per week',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Network at 2 local business events monthly',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Ask satisfied clients for referrals',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },

        // Service Excellence
        {
            id: generateId(),
            name: 'Create project onboarding process',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Define service packages and pricing',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build client feedback system',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Deliver all projects on time',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },

        // Business Operations
        {
            id: generateId(),
            name: 'Set up business bank account',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create contract templates',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Implement project management system',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Hire virtual assistant for admin tasks',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Skills & Marketing
        {
            id: generateId(),
            name: 'Master Figma advanced features',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Post design tips on social media 3x/week',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Start design newsletter',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create free design resources for lead gen',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Build Strong Brand Presence',
            description: 'Create professional image that attracts clients',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Generate Steady Leads',
            description: 'Implement multi-channel client acquisition',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Deliver Outstanding Work',
            description: 'Exceed client expectations consistently',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Professionalize Operations',
            description: 'Run business like a real company',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build Authority',
            description: 'Establish expertise through content marketing',
            taskIds: [tasks[16].id, tasks[17].id, tasks[18].id, tasks[19].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const kpis: KPI[] = [
        {
            id: generateId(),
            name: 'Active Clients',
            target: 8,
            current: 3,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Monthly Revenue',
            target: 8000,
            current: 2500,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Average Project Value',
            target: 2000,
            current: 800,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Client Retention Rate',
            target: 70,
            current: 45,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Projects Completed',
            target: 60,
            current: 15,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Client Satisfaction Score',
            target: 4.8,
            current: 4.5,
            unit: '/5',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Qualified Leads per Month',
            target: 15,
            current: 6,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Social Media Following',
            target: 2000,
            current: 320,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Business Health Score',
            target: 9,
            current: 6,
            unit: '/10',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const goals: Goal[] = [
        {
            id: generateId(),
            name: 'Build Stable Client Base',
            description: 'Maintain 8+ active clients consistently',
            kpiIds: [kpis[0].id, kpis[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Reach $8K Monthly Revenue',
            description: 'Achieve sustainable full-time income',
            kpiIds: [kpis[1].id, kpis[2].id, kpis[4].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Establish Design Authority',
            description: 'Be recognized as expert in the field',
            kpiIds: [kpis[5].id, kpis[6].id, kpis[7].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'Professional Positioning',
            description: 'Present as established expert, not beginner',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[0].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Proactive Outreach',
            description: "Don't wait for clients, actively pursue them",
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Quality Over Quantity',
            description: 'Focus on delivering exceptional results',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[2].id, actions[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Content-Led Growth',
            description: 'Attract clients through valuable content',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[4].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const ogsm: OGSM = {
        id: generateId(),
        name: 'Freelance Design Business',
        objective:
            'Build a thriving freelance design business within 12 months, earning $8,000 monthly by serving 8+ active clients with exceptional design work while establishing myself as a recognized expert.',
        goalIds: goals.map((g) => g.id),
        strategyIds: strategies.map((s) => s.id),
        createdAt: now,
        updatedAt: now,
    };

    return { ogsm, goals, strategies, actions, tasks, kpis };
};
