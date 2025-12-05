/**
 * OGSM: Podcast Launch and Growth
 * Launching a successful podcast on entrepreneurship
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';

export const createPodcastLaunchData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
) => {
    const now = getCurrentTimestamp();

    const tasks: Task[] = [
        // Setup
        {
            id: generateId(),
            name: 'Choose podcast name and concept',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Buy quality microphone and equipment',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create intro/outro music',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Setup hosting on Buzzsprout',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },

        // Content Creation
        {
            id: generateId(),
            name: 'Record first 5 episodes before launch',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Develop episode format and structure',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Learn audio editing in Audacity',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create content calendar for 3 months',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Guest Strategy
        {
            id: generateId(),
            name: 'Interview 10 successful entrepreneurs',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create guest application process',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Develop pre-interview questionnaire',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build relationships with potential guests',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },

        // Promotion
        {
            id: generateId(),
            name: 'Design podcast cover art',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Submit to Apple Podcasts, Spotify',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create audiograms for social media',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Ask guests to share episodes',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Professional Setup',
            description: 'Create quality podcast infrastructure',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Produce Valuable Content',
            description: 'Create episodes people want to hear',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Land Great Guests',
            description: 'Interview interesting, credible people',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build Audience',
            description: 'Get podcast discovered and shared',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const kpis: KPI[] = [
        {
            id: generateId(),
            name: 'Episodes Published',
            target: 52,
            current: 3,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Total Downloads',
            target: 25000,
            current: 450,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Average Downloads per Episode',
            target: 500,
            current: 150,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Podcast Reviews',
            target: 100,
            current: 8,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Average Rating',
            target: 4.7,
            current: 4.9,
            unit: '/5',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Email Subscribers',
            target: 2000,
            current: 120,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Guest Interviews',
            target: 30,
            current: 2,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Sponsorship Revenue',
            target: 1000,
            current: 0,
            unit: '$/month',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Content Quality',
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
            name: 'Publish 52 Episodes in Year One',
            description: 'Build library of consistent weekly content',
            kpiIds: [kpis[0].id, kpis[6].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Reach 25K Total Downloads',
            description: 'Build growing, engaged audience',
            kpiIds: [kpis[1].id, kpis[2].id, kpis[5].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Achieve 100 Five-Star Reviews',
            description: 'Create podcast listeners love',
            kpiIds: [kpis[3].id, kpis[4].id, kpis[7].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'Consistency First',
            description: 'Never miss a weekly episode',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[0].id, actions[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Guest-Powered Growth',
            description: 'Leverage guest audiences for reach',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[2].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Multi-Platform Presence',
            description: 'Repurpose content across channels',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[3].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const ogsm: OGSM = {
        id: generateId(),
        name: 'Podcast Launch and Growth',
        objective:
            'Launch and grow a successful entrepreneurship podcast, publishing 52 episodes in the first year, reaching 25,000 downloads, and earning 100 five-star reviews by delivering valuable, inspiring content.',
        goalIds: goals.map((g) => g.id),
        strategyIds: strategies.map((s) => s.id),
        createdAt: now,
        updatedAt: now,
    };

    return { ogsm, goals, strategies, actions, tasks, kpis };
};
