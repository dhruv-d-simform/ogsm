/**
 * OGSM: Photography Business
 * A photographer building a profitable wedding photography business
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';

export const createPhotographyBusinessData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
) => {
    const now = getCurrentTimestamp();

    const tasks: Task[] = [
        // Portfolio Building
        {
            id: generateId(),
            name: 'Shoot 5 styled sessions for portfolio',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create professional website',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Edit and showcase best 50 images',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Get testimonials from past clients',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },

        // Equipment & Skills
        {
            id: generateId(),
            name: 'Invest in backup camera body',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Master off-camera flash techniques',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Develop consistent editing style',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Practice posing and directing couples',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Marketing
        {
            id: generateId(),
            name: 'Build Instagram to 5K followers',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Network with wedding planners',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Get featured in wedding blogs',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Attend bridal shows and expos',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Business Operations
        {
            id: generateId(),
            name: 'Create pricing packages',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Setup online booking system',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Develop client contracts',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Streamline editing workflow',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Build Stunning Portfolio',
            description: 'Create work that wows potential clients',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Master Craft',
            description: 'Develop technical and artistic excellence',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Generate Bookings',
            description: 'Get in front of ideal clients',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Run Efficiently',
            description: 'Streamline business operations',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const kpis: KPI[] = [
        {
            id: generateId(),
            name: 'Weddings Booked',
            target: 20,
            current: 5,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Average Package Price',
            target: 3500,
            current: 2200,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Annual Revenue',
            target: 70000,
            current: 11000,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Booking Inquiries per Month',
            target: 15,
            current: 4,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Inquiry to Booking Rate',
            target: 50,
            current: 30,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Client Satisfaction',
            target: 5,
            current: 4.7,
            unit: '/5',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Portfolio Quality Score',
            target: 9,
            current: 7.5,
            unit: '/10',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Referral Rate',
            target: 40,
            current: 25,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Business Success',
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
            name: 'Book 20 Weddings This Year',
            description: 'Build fully booked wedding season',
            kpiIds: [kpis[0].id, kpis[3].id, kpis[4].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Earn $70K Annual Revenue',
            description: 'Achieve full-time income from photography',
            kpiIds: [kpis[1].id, kpis[2].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Become Top-Tier Photographer',
            description: 'Be recognized for exceptional work',
            kpiIds: [kpis[5].id, kpis[6].id, kpis[7].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'Portfolio Excellence',
            description: 'Let the work speak for itself',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[0].id, actions[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Strategic Visibility',
            description: 'Get seen by couples planning weddings',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[2].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Premium Positioning',
            description: 'Price and present as high-end service',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[3].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const ogsm: OGSM = {
        id: generateId(),
        name: 'Wedding Photography Business',
        objective:
            'Build a thriving wedding photography business, booking 20 weddings per year at $3,500+ per wedding to earn $70,000 annually while being recognized for exceptional artistry and client experience.',
        goalIds: goals.map((g) => g.id),
        strategyIds: strategies.map((s) => s.id),
        createdAt: now,
        updatedAt: now,
    };

    return { ogsm, goals, strategies, actions, tasks, kpis };
};
