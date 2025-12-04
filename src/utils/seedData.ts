/**
 * Seed data for OGSM application
 * Contains a 5-year career growth plan for a React developer
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';
import {
    STORAGE_KEYS,
    writeToStorage,
    readFromStorage,
    generateId,
    getCurrentTimestamp,
} from './storage';

/**
 * Check if storage is empty
 */
export const isStorageEmpty = (): boolean => {
    const ogsms = readFromStorage<OGSM>(STORAGE_KEYS.OGSM);
    return ogsms.length === 0;
};

/**
 * Seed the database with initial data
 */
export const seedDatabase = (): void => {
    if (!isStorageEmpty()) {
        console.log('Storage already has data. Skipping seed.');
        return;
    }

    console.log('Seeding database with React Developer 5-Year Career Plan...');

    const now = getCurrentTimestamp();

    // Create Tasks
    const tasks: Task[] = [
        // Year 1 - Master React Fundamentals
        {
            id: generateId(),
            name: 'Complete React official documentation',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build 3 personal projects with hooks',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Learn TypeScript basics',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Study component composition patterns',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Year 1 - State Management
        {
            id: generateId(),
            name: 'Learn Context API and useReducer',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Master Redux Toolkit',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Explore Zustand and Jotai',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build app with complex state management',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Year 2 - Advanced React Patterns
        {
            id: generateId(),
            name: 'Study render props and HOCs',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Learn compound components pattern',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Master custom hooks creation',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Implement controlled components library',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Year 2 - Testing Excellence
        {
            id: generateId(),
            name: 'Learn Jest and React Testing Library',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Write unit tests for all components',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Implement E2E tests with Playwright',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Achieve 80%+ test coverage',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Year 3 - Architecture & Performance
        {
            id: generateId(),
            name: 'Study micro-frontends architecture',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Learn React performance optimization',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Master code-splitting and lazy loading',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Implement performance monitoring',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Year 3 - Team Collaboration
        {
            id: generateId(),
            name: 'Conduct code reviews regularly',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Mentor 2 junior developers',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create team documentation standards',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Lead technical discussions',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Year 4 - Leadership & Open Source
        {
            id: generateId(),
            name: 'Contribute to major React libraries',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create and maintain OSS project',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Write technical blog posts',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Speak at local meetups',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Year 4 - Full-Stack Capabilities
        {
            id: generateId(),
            name: 'Learn Node.js and Express',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Master GraphQL and Apollo',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build full-stack application',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Learn database design',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Year 5 - Technical Leadership
        {
            id: generateId(),
            name: 'Lead architecture decisions',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Design scalable systems',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Establish engineering standards',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build high-performing team',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Year 5 - Industry Influence
        {
            id: generateId(),
            name: 'Speak at major conferences',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Publish technical articles',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build developer community',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create educational content',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
    ];

    // Create Actions
    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Master React Fundamentals',
            description: 'Build strong foundation in React core concepts',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Learn State Management',
            description: 'Master various state management solutions',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Study Advanced Patterns',
            description: 'Learn advanced React patterns and best practices',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Implement Testing Strategy',
            description: 'Build comprehensive testing skills',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Learn Architecture',
            description: 'Study scalable application architecture',
            taskIds: [tasks[16].id, tasks[17].id, tasks[18].id, tasks[19].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Mentor Team Members',
            description: 'Develop mentorship and collaboration skills',
            taskIds: [tasks[20].id, tasks[21].id, tasks[22].id, tasks[23].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build Open Source Presence',
            description: 'Contribute to and maintain open source projects',
            taskIds: [tasks[24].id, tasks[25].id, tasks[26].id, tasks[27].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Expand to Full-Stack',
            description:
                'Learn backend technologies and full-stack development',
            taskIds: [tasks[28].id, tasks[29].id, tasks[30].id, tasks[31].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Lead Technical Initiatives',
            description:
                'Take ownership of technical decisions and architecture',
            taskIds: [tasks[32].id, tasks[33].id, tasks[34].id, tasks[35].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build Industry Influence',
            description: 'Establish presence as a thought leader',
            taskIds: [tasks[36].id, tasks[37].id, tasks[38].id, tasks[39].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    // Create KPIs
    const kpis: KPI[] = [
        // Year 1-2 KPIs
        {
            id: generateId(),
            name: 'Projects Completed',
            target: 15,
            current: 8,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Code Quality Score',
            target: 85,
            current: 72,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Learning Hours',
            target: 500,
            current: 220,
            unit: 'hours',
            createdAt: now,
            updatedAt: now,
        },

        // Year 2-3 KPIs
        {
            id: generateId(),
            name: 'Test Coverage',
            target: 80,
            current: 45,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Performance Score',
            target: 95,
            current: 70,
            unit: 'points',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Code Reviews Done',
            target: 100,
            current: 35,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },

        // Year 3-4 KPIs
        {
            id: generateId(),
            name: 'Team Members Mentored',
            target: 5,
            current: 1,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Technical Articles',
            target: 20,
            current: 3,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'OSS Contributions',
            target: 50,
            current: 8,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },

        // Year 4-5 KPIs
        {
            id: generateId(),
            name: 'Conference Talks',
            target: 5,
            current: 0,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Architecture Decisions Led',
            target: 10,
            current: 0,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Community Following',
            target: 5000,
            current: 150,
            unit: 'followers',
            createdAt: now,
            updatedAt: now,
        },

        // Dashboard KPIs
        {
            id: generateId(),
            name: 'Technical Skills Rating',
            target: 9,
            current: 6.5,
            unit: '/10',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Leadership Skills',
            target: 8,
            current: 4,
            unit: '/10',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Industry Recognition',
            target: 8,
            current: 3,
            unit: '/10',
            createdAt: now,
            updatedAt: now,
        },
    ];

    // Create Goals
    const goals: Goal[] = [
        {
            id: generateId(),
            name: 'Become React Expert (Year 1-2)',
            description: 'Master React fundamentals and advanced patterns',
            kpiIds: [kpis[0].id, kpis[1].id, kpis[2].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Achieve Senior Developer Level (Year 2-3)',
            description:
                'Develop testing, performance, and architecture skills',
            kpiIds: [kpis[3].id, kpis[4].id, kpis[5].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Establish Technical Leadership (Year 3-4)',
            description:
                'Lead projects, mentor team, and contribute to open source',
            kpiIds: [kpis[6].id, kpis[7].id, kpis[8].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Become Industry Influencer (Year 4-5)',
            description:
                'Build reputation as thought leader and technical expert',
            kpiIds: [kpis[9].id, kpis[10].id, kpis[11].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    // Create Strategies
    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'Continuous Learning & Skill Development',
            description:
                'Invest in learning new technologies and deepening React expertise',
            dashboardKpiIds: [kpis[12].id],
            actionIds: [
                actions[0].id,
                actions[1].id,
                actions[2].id,
                actions[3].id,
            ],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build Strong Engineering Practices',
            description:
                'Establish quality standards through testing and architecture',
            dashboardKpiIds: [kpis[12].id],
            actionIds: [actions[4].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Develop Leadership & Mentorship Skills',
            description: 'Grow as a technical leader and mentor',
            dashboardKpiIds: [kpis[13].id],
            actionIds: [actions[5].id, actions[8].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build Public Profile & Network',
            description:
                'Establish industry presence through content and community',
            dashboardKpiIds: [kpis[14].id],
            actionIds: [actions[6].id, actions[9].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Expand Technical Breadth',
            description: 'Become a well-rounded full-stack developer',
            dashboardKpiIds: [kpis[12].id],
            actionIds: [actions[7].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    // Create OGSM
    const ogsms: OGSM[] = [
        {
            id: generateId(),
            name: 'React Developer 5-Year Career Plan',
            objective:
                'Transform from a junior React developer into a recognized technical leader and industry influencer within 5 years, with deep expertise in React ecosystem, proven leadership capabilities, and a strong professional network.',
            goalIds: goals.map((g) => g.id),
            strategyIds: strategies.map((s) => s.id),
            createdAt: now,
            updatedAt: now,
        },
    ];

    // Write to storage
    writeToStorage(STORAGE_KEYS.TASKS, tasks);
    writeToStorage(STORAGE_KEYS.ACTIONS, actions);
    writeToStorage(STORAGE_KEYS.KPIS, kpis);
    writeToStorage(STORAGE_KEYS.GOALS, goals);
    writeToStorage(STORAGE_KEYS.STRATEGIES, strategies);
    writeToStorage(STORAGE_KEYS.OGSM, ogsms);

    console.log('✅ Database seeded successfully!');
    console.log(
        `Created: ${ogsms.length} OGSM, ${goals.length} Goals, ${strategies.length} Strategies, ${actions.length} Actions, ${tasks.length} Tasks, ${kpis.length} KPIs`
    );
};
