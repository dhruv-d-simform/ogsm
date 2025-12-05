/**
 * OGSM: Marathon Training Plan
 * A runner preparing to complete their first marathon
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';

export const createMarathonTrainingData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
) => {
    const now = getCurrentTimestamp();

    const tasks: Task[] = [
        // Base Building
        {
            id: generateId(),
            name: 'Run 4 times per week consistently',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Complete 10K without walking',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build weekly mileage to 40 miles',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Establish recovery routine',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },

        // Long Runs
        {
            id: generateId(),
            name: 'Complete 20-mile long run',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Run multiple 15+ mile runs',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Practice race day nutrition',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Test all race day gear',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Cross Training
        {
            id: generateId(),
            name: 'Strength train 2x per week',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Add yoga for flexibility',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Include cycling on easy days',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Practice core exercises',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },

        // Injury Prevention
        {
            id: generateId(),
            name: 'Get proper running shoes fitted',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Foam roll after every run',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Listen to body and rest when needed',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Schedule sports massage monthly',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Race Preparation
        {
            id: generateId(),
            name: 'Register for target marathon',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Complete 2 half marathons as practice',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Study race course and elevation',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Plan race day logistics',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Build Aerobic Base',
            description: 'Develop endurance through consistent running',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Master Long Distance',
            description: 'Train body to handle marathon distance',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Strengthen Supporting Systems',
            description: 'Build overall fitness and resilience',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Stay Healthy',
            description: 'Prevent injuries through smart training',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Prepare for Race Day',
            description: 'Ensure everything is ready for the marathon',
            taskIds: [tasks[16].id, tasks[17].id, tasks[18].id, tasks[19].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const kpis: KPI[] = [
        {
            id: generateId(),
            name: 'Weekly Mileage',
            target: 45,
            current: 28,
            unit: 'miles',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Longest Run',
            target: 20,
            current: 12,
            unit: 'miles',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Training Weeks Completed',
            target: 16,
            current: 7,
            unit: 'weeks',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Average Pace (per mile)',
            target: 9,
            current: 10.5,
            unit: 'min',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Cross Training Sessions',
            target: 32,
            current: 14,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Marathon Finish Time Goal',
            target: 240,
            current: 0,
            unit: 'min',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Injury-Free Days',
            target: 120,
            current: 49,
            unit: 'days',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Resting Heart Rate',
            target: 55,
            current: 62,
            unit: 'bpm',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Training Readiness',
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
            name: 'Build to 45 Miles per Week',
            description: 'Safely increase running volume',
            kpiIds: [kpis[0].id, kpis[1].id, kpis[2].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Finish Marathon Under 4 Hours',
            description: 'Complete 26.2 miles in target time',
            kpiIds: [kpis[3].id, kpis[5].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Stay Injury-Free Throughout Training',
            description: 'Train smart and remain healthy',
            kpiIds: [kpis[4].id, kpis[6].id, kpis[7].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'Progressive Overload',
            description: 'Gradually increase distance and intensity',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[0].id, actions[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Holistic Training Approach',
            description: 'Include strength, flexibility, and recovery',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[2].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Smart Recovery Protocol',
            description: 'Prioritize rest and injury prevention',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Detailed Race Planning',
            description: 'Prepare mentally and logistically for race day',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[4].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const ogsm: OGSM = {
        id: generateId(),
        name: 'Marathon Training Plan',
        objective:
            'Successfully complete my first marathon in under 4 hours within the next 4 months, building the endurance, strength, and confidence needed while staying injury-free throughout training.',
        goalIds: goals.map((g) => g.id),
        strategyIds: strategies.map((s) => s.id),
        createdAt: now,
        updatedAt: now,
    };

    return { ogsm, goals, strategies, actions, tasks, kpis };
};
