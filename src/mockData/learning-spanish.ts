/**
 * OGSM: Learning Spanish Plan
 * Someone learning Spanish to conversational fluency
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';

export const createLearningSpanishData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
) => {
    const now = getCurrentTimestamp();

    const tasks: Task[] = [
        // Foundation Building
        {
            id: generateId(),
            name: 'Complete Duolingo Spanish tree',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Learn 1000 most common words',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Master basic grammar rules',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Practice pronunciation daily',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },

        // Speaking Practice
        {
            id: generateId(),
            name: 'Find language exchange partner',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Attend weekly conversation group',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Take online tutoring sessions 2x/week',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Order food in Spanish at restaurants',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Immersion
        {
            id: generateId(),
            name: 'Watch Spanish TV shows with subtitles',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Listen to Spanish podcasts daily',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Read one Spanish book per month',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Change phone language to Spanish',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Cultural Understanding
        {
            id: generateId(),
            name: 'Learn about Spanish-speaking cultures',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Try cooking traditional recipes',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Plan trip to Spanish-speaking country',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Join online Spanish community',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Build Strong Foundation',
            description: 'Master essential vocabulary and grammar',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Practice Speaking Regularly',
            description: 'Get comfortable having conversations',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Immerse in Language',
            description: 'Surround yourself with Spanish content',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Connect with Culture',
            description: 'Understand cultural context and nuances',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const kpis: KPI[] = [
        {
            id: generateId(),
            name: 'Vocabulary Words Known',
            target: 3000,
            current: 450,
            unit: 'words',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Study Hours Logged',
            target: 500,
            current: 85,
            unit: 'hours',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Conversation Sessions',
            target: 100,
            current: 12,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Speaking Confidence',
            target: 8,
            current: 4,
            unit: '/10',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Listening Comprehension',
            target: 85,
            current: 45,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'TV Shows Watched',
            target: 24,
            current: 3,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Books Read in Spanish',
            target: 12,
            current: 0,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Daily Study Streak',
            target: 365,
            current: 42,
            unit: 'days',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Overall Fluency Level',
            target: 8,
            current: 3,
            unit: '/10',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const goals: Goal[] = [
        {
            id: generateId(),
            name: 'Master Core Language Skills',
            description: 'Build solid foundation in vocabulary and grammar',
            kpiIds: [kpis[0].id, kpis[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Achieve Conversational Fluency',
            description: 'Speak confidently in everyday situations',
            kpiIds: [kpis[2].id, kpis[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Understand Native Content',
            description: 'Enjoy Spanish movies, books, and podcasts',
            kpiIds: [kpis[4].id, kpis[5].id, kpis[6].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'Daily Consistent Practice',
            description: 'Study every day without breaking the chain',
            dashboardKpiIds: [kpis[7].id, kpis[8].id],
            actionIds: [actions[0].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Active Speaking Focus',
            description: 'Prioritize speaking over passive learning',
            dashboardKpiIds: [kpis[7].id, kpis[8].id],
            actionIds: [actions[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Full Immersion Approach',
            description: 'Integrate Spanish into daily life',
            dashboardKpiIds: [kpis[7].id, kpis[8].id],
            actionIds: [actions[2].id, actions[3].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const ogsm: OGSM = {
        id: generateId(),
        name: 'Learning Spanish Plan',
        objective:
            'Achieve conversational fluency in Spanish within 18 months, enabling me to have natural conversations, understand native content, and connect with Spanish-speaking communities.',
        description: `# Spanish Language Learning Journey

Master conversational Spanish through immersive, consistent practice and strategic learning methods that build practical communication skills rather than just textbook knowledge.

## Learning Philosophy

This plan rejects traditional classroom-only approaches in favor of **acquisition through use**. Real fluency comes from speaking, listening, making mistakes, and gradually building intuition—not from perfect grammar exercises.

## Proficiency Milestones

- **Months 1-6 (Foundation)**: Build core vocabulary (1000+ words), basic grammar, simple conversations
- **Months 7-12 (Development)**: Expand to 2000+ words, improve pronunciation, handle everyday situations
- **Months 13-18 (Fluency)**: Achieve natural conversation flow, understand native speakers, think in Spanish

## Multi-Modal Approach

Success requires engaging with Spanish through multiple channels:

- **Structured Learning**: Daily app practice for vocabulary and grammar foundations
- **Immersion**: Spanish music, podcasts, TV shows for ear training
- **Conversation Practice**: Weekly language exchange to build speaking confidence
- **Cultural Context**: Understanding idioms, customs, and regional variations

## Measuring Progress

Beyond vocabulary counts and Duolingo streaks, true progress is measured by confidence in real-world situations: ordering food, having casual conversations, understanding movies without subtitles.

The goal isn't perfection—it's functional fluency where Spanish becomes a tool for connection and communication.`,
        goalIds: goals.map((g) => g.id),
        strategyIds: strategies.map((s) => s.id),
        createdAt: now,
        updatedAt: now,
    };

    return { ogsm, goals, strategies, actions, tasks, kpis };
};
