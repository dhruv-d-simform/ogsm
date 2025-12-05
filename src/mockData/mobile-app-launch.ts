/**
 * OGSM: Mobile App Launch Plan
 * A startup launching their first mobile app product
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';

export const createMobileAppLaunchData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
) => {
    const now = getCurrentTimestamp();

    const tasks: Task[] = [
        // Product Development
        {
            id: generateId(),
            name: 'Complete user research interviews',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Design app wireframes and mockups',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build MVP with core features',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Conduct beta testing with 50 users',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Marketing
        {
            id: generateId(),
            name: 'Create landing page and website',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build email list of 1000 subscribers',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Produce demo video',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Plan launch day social media campaign',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // User Acquisition
        {
            id: generateId(),
            name: 'Set up app store listings (iOS & Android)',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Partner with 3 influencers',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Launch Product Hunt campaign',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create referral program',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Infrastructure
        {
            id: generateId(),
            name: 'Set up analytics tracking',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Implement crash reporting',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Configure push notifications',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Setup customer support system',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Monetization
        {
            id: generateId(),
            name: 'Design subscription tiers',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Integrate payment processing',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create upgrade prompts',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Plan pricing experiments',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Build Quality Product',
            description: 'Create polished MVP based on user needs',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Generate Launch Buzz',
            description: 'Build anticipation before launch',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Drive Downloads',
            description: 'Execute multi-channel acquisition strategy',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Setup Operations',
            description: 'Ensure smooth technical operations',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Enable Revenue',
            description: 'Implement monetization strategy',
            taskIds: [tasks[16].id, tasks[17].id, tasks[18].id, tasks[19].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const kpis: KPI[] = [
        {
            id: generateId(),
            name: 'Total Downloads',
            target: 10000,
            current: 0,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Active Users (Monthly)',
            target: 5000,
            current: 0,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'App Store Rating',
            target: 4.5,
            current: 0,
            unit: '/5',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'User Retention (Day 7)',
            target: 40,
            current: 0,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Paid Subscribers',
            target: 500,
            current: 0,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Monthly Revenue',
            target: 15000,
            current: 0,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Free to Paid Conversion',
            target: 8,
            current: 0,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Customer Acquisition Cost',
            target: 15,
            current: 0,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Product-Market Fit Score',
            target: 8,
            current: 5,
            unit: '/10',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const goals: Goal[] = [
        {
            id: generateId(),
            name: 'Reach 10K Downloads in First 3 Months',
            description: 'Achieve strong initial user adoption',
            kpiIds: [kpis[0].id, kpis[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build Engaged User Base',
            description: 'Create loyal users who love the product',
            kpiIds: [kpis[2].id, kpis[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Generate $15K Monthly Revenue',
            description: 'Prove business model viability',
            kpiIds: [kpis[4].id, kpis[5].id, kpis[6].id, kpis[7].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'User-Centric Development',
            description: 'Build features users actually want and need',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[0].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Multi-Channel Launch',
            description: 'Create momentum through coordinated marketing',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[1].id, actions[2].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Growth Through Retention',
            description: 'Focus on keeping users engaged long-term',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Sustainable Monetization',
            description: 'Convert free users to paying customers',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[4].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const ogsm: OGSM = {
        id: generateId(),
        name: 'Mobile App Launch Plan',
        objective:
            'Successfully launch our mobile app and reach 10,000 downloads within 3 months, building an engaged user base and generating $15K in monthly recurring revenue to prove product-market fit.',
        goalIds: goals.map((g) => g.id),
        strategyIds: strategies.map((s) => s.id),
        createdAt: now,
        updatedAt: now,
    };

    return { ogsm, goals, strategies, actions, tasks, kpis };
};
