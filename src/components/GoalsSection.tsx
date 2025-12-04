import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { GoalItem } from '@/components/GoalItem';
import type { Goal, KPI } from '@/types';

// Mock data - will be replaced with API calls later
const MOCK_GOALS: Goal[] = [
    {
        id: 'goal-1',
        name: 'Become React Expert (Year 1-2)',
        description: 'Master React fundamentals and advanced patterns',
        kpiIds: ['kpi-1', 'kpi-2', 'kpi-3'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'goal-2',
        name: 'Achieve Senior Developer Level (Year 2-3)',
        description: 'Develop testing, performance, and architecture skills',
        kpiIds: ['kpi-4', 'kpi-5', 'kpi-6'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'goal-3',
        name: 'Establish Technical Leadership (Year 3-4)',
        description:
            'Lead projects, mentor team, and contribute to open source',
        kpiIds: ['kpi-7', 'kpi-8', 'kpi-9'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'goal-4',
        name: 'Become Industry Influencer (Year 4-5)',
        description: 'Build reputation as thought leader and technical expert',
        kpiIds: ['kpi-10', 'kpi-11', 'kpi-12'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const MOCK_KPIS: KPI[] = [
    {
        id: 'kpi-1',
        name: 'Projects Completed',
        target: 15,
        current: 8,
        unit: 'count',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'kpi-2',
        name: 'Code Quality Score',
        target: 85,
        current: 72,
        unit: '%',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'kpi-3',
        name: 'Learning Hours',
        target: 500,
        current: 220,
        unit: 'hours',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'kpi-4',
        name: 'Test Coverage',
        target: 80,
        current: 45,
        unit: '%',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'kpi-5',
        name: 'Performance Score',
        target: 95,
        current: 70,
        unit: 'points',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'kpi-6',
        name: 'Code Reviews Done',
        target: 100,
        current: 35,
        unit: 'count',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'kpi-7',
        name: 'Team Members Mentored',
        target: 5,
        current: 1,
        unit: 'count',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'kpi-8',
        name: 'Technical Articles',
        target: 20,
        current: 3,
        unit: 'count',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'kpi-9',
        name: 'OSS Contributions',
        target: 50,
        current: 8,
        unit: 'count',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'kpi-10',
        name: 'Conference Talks',
        target: 5,
        current: 0,
        unit: 'count',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'kpi-11',
        name: 'Architecture Decisions Led',
        target: 10,
        current: 0,
        unit: 'count',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'kpi-12',
        name: 'Community Following',
        target: 5000,
        current: 150,
        unit: 'followers',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

/**
 * Helper to get KPIs for a goal
 */
const getKpisForGoal = (goal: Goal): KPI[] => {
    return MOCK_KPIS.filter((kpi) => goal.kpiIds.includes(kpi.id));
};

/**
 * Goals Section Component
 * Displays the goals list on the left side of the board
 */
export function GoalsSection() {
    return (
        <div className="flex h-full flex-col rounded-lg border border-gray-300">
            {/* Header */}
            <div className="rounded-t-lg bg-blue-900 p-4 text-white">
                <h2 className="text-lg font-semibold">Goals</h2>
            </div>

            {/* Content Area - Scrollable List */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    {/* Goals List */}
                    <div>
                        {MOCK_GOALS.map((goal) => (
                            <GoalItem
                                key={goal.id}
                                goal={goal}
                                kpis={getKpisForGoal(goal)}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Add New Goal Input */}
            <div className="border-t border-gray-300 p-3">
                <Input
                    type="text"
                    placeholder="Add new goal..."
                    className="text-sm"
                />
            </div>
        </div>
    );
}
