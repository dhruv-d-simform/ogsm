import { ScrollArea } from '@/components/ui/scroll-area';
import { StrategyItem } from '@/components/StrategyItem';
import type { Strategy, KPI, Action, Task } from '@/types';

// Mock data - will be replaced with API calls later
const MOCK_STRATEGIES: Strategy[] = [
    {
        id: 'strategy-1',
        name: 'Continuous Learning & Skill Development',
        description:
            'Invest in learning new technologies and deepening React expertise',
        dashboardKpiIds: ['kpi-13'],
        actionIds: ['action-1', 'action-2', 'action-3', 'action-4'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'strategy-2',
        name: 'Build Strong Engineering Practices',
        description:
            'Establish quality standards through testing and architecture',
        dashboardKpiIds: ['kpi-13'],
        actionIds: ['action-5'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'strategy-3',
        name: 'Develop Leadership & Mentorship Skills',
        description: 'Grow as a technical leader and mentor',
        dashboardKpiIds: ['kpi-14'],
        actionIds: ['action-6', 'action-9'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'strategy-4',
        name: 'Build Public Profile & Network',
        description:
            'Establish industry presence through content and community',
        dashboardKpiIds: ['kpi-15'],
        actionIds: ['action-7', 'action-10'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'strategy-5',
        name: 'Expand Technical Breadth',
        description: 'Become a well-rounded full-stack developer',
        dashboardKpiIds: ['kpi-13'],
        actionIds: ['action-8'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const MOCK_KPIS: KPI[] = [
    {
        id: 'kpi-13',
        name: 'Technical Skills Rating',
        target: 9,
        current: 6.5,
        unit: '/10',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'kpi-14',
        name: 'Leadership Skills',
        target: 8,
        current: 4,
        unit: '/10',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'kpi-15',
        name: 'Industry Recognition',
        target: 8,
        current: 3,
        unit: '/10',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const MOCK_ACTIONS: Action[] = [
    {
        id: 'action-1',
        name: 'Master React Fundamentals',
        description: 'Build strong foundation in React core concepts',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'action-2',
        name: 'Learn State Management',
        description: 'Master various state management solutions',
        taskIds: ['task-5', 'task-6', 'task-7', 'task-8'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'action-3',
        name: 'Study Advanced Patterns',
        description: 'Learn advanced React patterns and best practices',
        taskIds: ['task-9', 'task-10', 'task-11', 'task-12'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'action-4',
        name: 'Implement Testing Strategy',
        description: 'Build comprehensive testing skills',
        taskIds: ['task-13', 'task-14', 'task-15', 'task-16'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'action-5',
        name: 'Learn Architecture',
        description: 'Study scalable application architecture',
        taskIds: ['task-17', 'task-18', 'task-19', 'task-20'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'action-6',
        name: 'Mentor Team Members',
        description: 'Develop mentorship and collaboration skills',
        taskIds: ['task-21', 'task-22', 'task-23', 'task-24'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'action-7',
        name: 'Build Open Source Presence',
        description: 'Contribute to and maintain open source projects',
        taskIds: ['task-25', 'task-26', 'task-27', 'task-28'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'action-8',
        name: 'Expand to Full-Stack',
        description: 'Learn backend technologies and full-stack development',
        taskIds: ['task-29', 'task-30', 'task-31', 'task-32'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'action-9',
        name: 'Lead Technical Initiatives',
        description: 'Take ownership of technical decisions and architecture',
        taskIds: ['task-33', 'task-34', 'task-35', 'task-36'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'action-10',
        name: 'Build Industry Influence',
        description: 'Establish presence as a thought leader',
        taskIds: ['task-37', 'task-38', 'task-39', 'task-40'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const MOCK_TASKS: Task[] = [
    // Tasks for Master React Fundamentals
    {
        id: 'task-1',
        name: 'Complete React official documentation',
        status: 'completed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-2',
        name: 'Build 3 personal projects with hooks',
        status: 'completed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-3',
        name: 'Learn TypeScript basics',
        status: 'in-progress',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-4',
        name: 'Study component composition patterns',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    // Tasks for Learn State Management
    {
        id: 'task-5',
        name: 'Learn Context API and useReducer',
        status: 'completed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-6',
        name: 'Master Redux Toolkit',
        status: 'in-progress',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-7',
        name: 'Explore Zustand and Jotai',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-8',
        name: 'Build app with complex state management',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    // Tasks for Study Advanced Patterns
    {
        id: 'task-9',
        name: 'Study render props and HOCs',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-10',
        name: 'Learn compound components pattern',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-11',
        name: 'Master custom hooks creation',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-12',
        name: 'Implement controlled components library',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    // Tasks for Implement Testing Strategy
    {
        id: 'task-13',
        name: 'Learn Jest and React Testing Library',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-14',
        name: 'Write unit tests for all components',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-15',
        name: 'Implement E2E tests with Playwright',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-16',
        name: 'Achieve 80%+ test coverage',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    // Tasks for Learn Architecture
    {
        id: 'task-17',
        name: 'Study micro-frontends architecture',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-18',
        name: 'Learn React performance optimization',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-19',
        name: 'Master code-splitting and lazy loading',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-20',
        name: 'Implement performance monitoring',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    // Tasks for Mentor Team Members
    {
        id: 'task-21',
        name: 'Conduct code reviews regularly',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-22',
        name: 'Mentor 2 junior developers',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-23',
        name: 'Create team documentation standards',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-24',
        name: 'Lead technical discussions',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    // Tasks for Build Open Source Presence
    {
        id: 'task-25',
        name: 'Contribute to major React libraries',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-26',
        name: 'Create and maintain OSS project',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-27',
        name: 'Write technical blog posts',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-28',
        name: 'Speak at local meetups',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    // Tasks for Expand to Full-Stack
    {
        id: 'task-29',
        name: 'Learn Node.js and Express',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-30',
        name: 'Master GraphQL and Apollo',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-31',
        name: 'Build full-stack application',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-32',
        name: 'Learn database design',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    // Tasks for Lead Technical Initiatives
    {
        id: 'task-33',
        name: 'Lead architecture decisions',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-34',
        name: 'Design scalable systems',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-35',
        name: 'Establish engineering standards',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-36',
        name: 'Build high-performing team',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    // Tasks for Build Industry Influence
    {
        id: 'task-37',
        name: 'Speak at major conferences',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-38',
        name: 'Publish technical articles',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-39',
        name: 'Build developer community',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'task-40',
        name: 'Create educational content',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

/**
 * Helper to get KPIs for a strategy
 */
const getDashboardKpisForStrategy = (strategy: Strategy): KPI[] => {
    return MOCK_KPIS.filter((kpi) => strategy.dashboardKpiIds.includes(kpi.id));
};

/**
 * Helper to get actions with tasks for a strategy
 */
const getActionsForStrategy = (
    strategy: Strategy
): Array<{ action: Action; tasks: Task[] }> => {
    const actions = MOCK_ACTIONS.filter((action) =>
        strategy.actionIds.includes(action.id)
    );

    return actions.map((action) => ({
        action,
        tasks: MOCK_TASKS.filter((task) => action.taskIds.includes(task.id)),
    }));
};

/**
 * Strategy Section Component
 * Displays the strategies on the right side of the board
 */
export function StrategySection() {
    return (
        <div className="flex h-full flex-col rounded-lg border border-gray-300">
            {/* Main Header - Strategy and Measures */}
            <div className="flex rounded-t-lg bg-blue-900 text-white">
                <div className="w-[25%] border-r border-white p-4">
                    <h2 className="text-lg font-semibold">Strategy</h2>
                </div>
                <div className="w-[75%] p-4">
                    <h2 className="text-lg font-semibold">Measures</h2>
                </div>
            </div>

            {/* Sub-header - Strategies, Dashboard, Actions */}
            <div className="flex border-b border-gray-300 bg-white text-sm">
                <div className="w-[25%] border-r border-gray-300 p-3">
                    <span className="font-medium text-black">Strategies</span>
                </div>
                <div className="w-[25%] border-r border-gray-300 p-3">
                    <span className="font-medium text-black">Dashboard</span>
                </div>
                <div className="w-[50%] p-3">
                    <span className="font-medium text-black">Actions</span>
                </div>
            </div>

            {/* Content Area - Scrollable Strategy List */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="flex flex-col gap-4">
                        {MOCK_STRATEGIES.map((strategy) => (
                            <StrategyItem
                                key={strategy.id}
                                strategy={strategy}
                                dashboardKpis={getDashboardKpisForStrategy(
                                    strategy
                                )}
                                actions={getActionsForStrategy(strategy)}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
