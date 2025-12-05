/**
 * OGSM: YouTube Channel Growth
 * A content creator building a successful YouTube channel
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';

export const createYoutubeChannelGrowthData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
) => {
    const now = getCurrentTimestamp();

    const tasks: Task[] = [
        // Content Creation
        {
            id: generateId(),
            name: 'Define channel niche and target audience',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create content calendar for 3 months',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Upload 2 videos per week consistently',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Improve video editing skills',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },

        // Channel Optimization
        {
            id: generateId(),
            name: 'Design professional channel banner',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Write SEO-optimized video descriptions',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create custom thumbnails for all videos',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Add end screens and cards',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Audience Engagement
        {
            id: generateId(),
            name: 'Respond to all comments within 24 hours',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Host monthly live Q&A sessions',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create community posts 3x per week',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Start Discord server for fans',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Monetization
        {
            id: generateId(),
            name: 'Reach 1000 subscribers milestone',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Achieve 4000 watch hours',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Apply for YouTube Partner Program',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Research brand sponsorship opportunities',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Promotion
        {
            id: generateId(),
            name: 'Share videos on social media',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Collaborate with 3 similar channels',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Join relevant online communities',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create short clips for TikTok/Instagram',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Produce High-Quality Content',
            description: 'Create valuable videos that audience loves',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Optimize for Discovery',
            description: 'Make videos easy to find and click',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build Community',
            description: 'Engage and retain loyal viewers',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Enable Revenue Streams',
            description: 'Monetize the channel effectively',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Expand Reach',
            description: 'Promote content across platforms',
            taskIds: [tasks[16].id, tasks[17].id, tasks[18].id, tasks[19].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const kpis: KPI[] = [
        {
            id: generateId(),
            name: 'Subscribers',
            target: 10000,
            current: 750,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Monthly Views',
            target: 100000,
            current: 8500,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Average View Duration',
            target: 8,
            current: 4.5,
            unit: 'min',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Click-Through Rate',
            target: 8,
            current: 4.2,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Videos Published',
            target: 104,
            current: 28,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Monthly Revenue',
            target: 2000,
            current: 0,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Engagement Rate',
            target: 10,
            current: 6.5,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Content Quality Score',
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
            name: 'Reach 10,000 Subscribers',
            description: 'Build substantial audience base',
            kpiIds: [kpis[0].id, kpis[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Achieve 100K Monthly Views',
            description: 'Grow viewership significantly',
            kpiIds: [kpis[2].id, kpis[3].id, kpis[4].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Generate $2K Monthly Income',
            description: 'Turn channel into income source',
            kpiIds: [kpis[5].id, kpis[6].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'Consistency and Quality',
            description: 'Post regularly with improving quality',
            dashboardKpiIds: [kpis[7].id],
            actionIds: [actions[0].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Algorithmic Optimization',
            description: 'Maximize discoverability through SEO',
            dashboardKpiIds: [kpis[7].id],
            actionIds: [actions[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Community Building',
            description: 'Turn viewers into loyal fans',
            dashboardKpiIds: [kpis[7].id],
            actionIds: [actions[2].id, actions[4].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Diversified Monetization',
            description: 'Create multiple revenue streams',
            dashboardKpiIds: [kpis[7].id],
            actionIds: [actions[3].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const ogsm: OGSM = {
        id: generateId(),
        name: 'YouTube Channel Growth Plan',
        objective:
            'Build a successful YouTube channel with 10,000 subscribers and 100K monthly views within 12 months, creating valuable content that generates $2,000 in monthly income.',
        goalIds: goals.map((g) => g.id),
        strategyIds: strategies.map((s) => s.id),
        createdAt: now,
        updatedAt: now,
    };

    return { ogsm, goals, strategies, actions, tasks, kpis };
};
