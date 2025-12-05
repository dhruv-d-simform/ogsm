/**
 * OGSM: Local Coffee Shop Expansion Plan
 * A small coffee shop owner wants to grow from 1 to 3 locations
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';

export const createCoffeeShopExpansionData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
) => {
    const now = getCurrentTimestamp();

    const tasks: Task[] = [
        // Market Research
        {
            id: generateId(),
            name: 'Survey current customers for feedback',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Analyze competitor locations and pricing',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Identify 3 potential new locations',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Calculate foot traffic for each location',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Menu Innovation
        {
            id: generateId(),
            name: 'Test 5 new seasonal drink recipes',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Source local pastry suppliers',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create loyalty program menu',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Design attractive food display',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Financial Planning
        {
            id: generateId(),
            name: 'Apply for small business loan',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create detailed budget for 2 new locations',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Negotiate bulk supplier discounts',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Set up accounting system for multiple locations',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Team Building
        {
            id: generateId(),
            name: 'Hire 2 assistant managers',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create training manual for baristas',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Schedule weekly team meetings',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Implement employee recognition program',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Marketing
        {
            id: generateId(),
            name: 'Launch Instagram account',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Partner with 3 local businesses',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create grand opening event plan',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Design loyalty card program',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Research New Locations',
            description: 'Find and evaluate potential sites for expansion',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Develop Unique Menu',
            description: 'Create signature drinks and food offerings',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Secure Funding',
            description: 'Obtain necessary capital for expansion',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build Strong Team',
            description: 'Hire and train quality staff members',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create Buzz',
            description: 'Build brand awareness in the community',
            taskIds: [tasks[16].id, tasks[17].id, tasks[18].id, tasks[19].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const kpis: KPI[] = [
        {
            id: generateId(),
            name: 'New Locations Opened',
            target: 2,
            current: 0,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Total Daily Customers',
            target: 450,
            current: 180,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Average Transaction Value',
            target: 12,
            current: 8.5,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Monthly Revenue',
            target: 120000,
            current: 45000,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Profit Margin',
            target: 25,
            current: 18,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Customer Satisfaction',
            target: 4.7,
            current: 4.3,
            unit: '/5',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Social Media Followers',
            target: 3000,
            current: 850,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Repeat Customers',
            target: 60,
            current: 42,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Employee Retention',
            target: 85,
            current: 70,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const goals: Goal[] = [
        {
            id: generateId(),
            name: 'Open 2 New Locations by Year End',
            description:
                'Successfully launch coffee shops in high-traffic areas',
            kpiIds: [kpis[0].id, kpis[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Triple Monthly Revenue',
            description:
                'Grow from $45K to $120K per month across all locations',
            kpiIds: [kpis[2].id, kpis[3].id, kpis[4].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build Loyal Customer Base',
            description:
                'Create a community of regular customers who love our brand',
            kpiIds: [kpis[5].id, kpis[6].id, kpis[7].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'Strategic Location Selection',
            description: 'Choose high-traffic locations with low competition',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[0].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Product Differentiation',
            description: 'Offer unique drinks and create signature experiences',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Smart Financial Management',
            description: 'Secure funding and maintain healthy profit margins',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[2].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Community Engagement',
            description:
                'Build strong local presence and customer relationships',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[3].id, actions[4].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const ogsm: OGSM = {
        id: generateId(),
        name: 'Coffee Shop Expansion Plan',
        objective:
            'Transform our single, beloved neighborhood coffee shop into a thriving 3-location business that becomes the go-to coffee destination in our city, known for exceptional quality, friendly service, and community connection.',
        goalIds: goals.map((g) => g.id),
        strategyIds: strategies.map((s) => s.id),
        createdAt: now,
        updatedAt: now,
    };

    return { ogsm, goals, strategies, actions, tasks, kpis };
};
