/**
 * OGSM: Personal Fitness Transformation
 * A person's journey to get healthy and fit over 12 months
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';

export const createFitnessTransformationData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
) => {
    const now = getCurrentTimestamp();

    const tasks: Task[] = [
        // Exercise Routine
        {
            id: generateId(),
            name: 'Join local gym',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Complete strength training 3x per week',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Run 5K without stopping',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Try yoga class for flexibility',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Nutrition
        {
            id: generateId(),
            name: 'Meal prep every Sunday',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Drink 8 glasses of water daily',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Reduce sugar intake by 50%',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Learn 10 healthy recipes',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Habit Building
        {
            id: generateId(),
            name: 'Wake up at 6am consistently',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Track calories for 30 days',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Get 7-8 hours sleep nightly',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Practice stress management techniques',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Progress Tracking
        {
            id: generateId(),
            name: 'Take weekly progress photos',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Log workouts in fitness app',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Monthly body measurements',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Celebrate small milestones',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Build Exercise Habit',
            description: 'Establish consistent workout routine',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Transform Eating Habits',
            description: 'Develop sustainable healthy eating patterns',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create Healthy Lifestyle',
            description: 'Build supporting habits for long-term success',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Monitor and Adjust',
            description: 'Track progress and stay motivated',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const kpis: KPI[] = [
        {
            id: generateId(),
            name: 'Weight Lost',
            target: 30,
            current: 12,
            unit: 'lbs',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Body Fat Percentage',
            target: 18,
            current: 28,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Workout Days per Week',
            target: 5,
            current: 3,
            unit: 'days',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Running Distance',
            target: 5,
            current: 2,
            unit: 'km',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Max Push-ups',
            target: 50,
            current: 15,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Daily Calorie Target',
            target: 2000,
            current: 2200,
            unit: 'cal',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Protein Intake',
            target: 150,
            current: 90,
            unit: 'g',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Energy Level',
            target: 8,
            current: 5,
            unit: '/10',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Overall Wellness',
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
            name: 'Lose 30 Pounds in 12 Months',
            description:
                'Achieve healthy weight through gradual, sustainable fat loss',
            kpiIds: [kpis[0].id, kpis[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build Strength and Endurance',
            description: 'Become physically capable and confident',
            kpiIds: [kpis[2].id, kpis[3].id, kpis[4].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Develop Healthy Eating Habits',
            description: 'Create sustainable nutrition practices',
            kpiIds: [kpis[5].id, kpis[6].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'Progressive Exercise Program',
            description: 'Gradually increase workout intensity and consistency',
            dashboardKpiIds: [kpis[7].id, kpis[8].id],
            actionIds: [actions[0].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Sustainable Nutrition Plan',
            description: 'Focus on whole foods and portion control',
            dashboardKpiIds: [kpis[7].id, kpis[8].id],
            actionIds: [actions[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Holistic Wellness Approach',
            description: 'Address sleep, stress, and daily habits',
            dashboardKpiIds: [kpis[7].id, kpis[8].id],
            actionIds: [actions[2].id, actions[3].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const ogsm: OGSM = {
        id: generateId(),
        name: 'Personal Fitness Transformation',
        objective:
            'Transform my health and fitness over the next 12 months, losing 30 pounds, building strength and endurance, and developing sustainable habits that will keep me healthy for life.',
        goalIds: goals.map((g) => g.id),
        strategyIds: strategies.map((s) => s.id),
        createdAt: now,
        updatedAt: now,
    };

    return { ogsm, goals, strategies, actions, tasks, kpis };
};
