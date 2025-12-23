/**
 * OGSM: Small Restaurant Opening
 * An entrepreneur opening a neighborhood restaurant
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';

export const createRestaurantOpeningData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
) => {
    const now = getCurrentTimestamp();

    const tasks: Task[] = [
        // Location & Setup
        {
            id: generateId(),
            name: 'Find and lease restaurant space',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Complete kitchen equipment installation',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Obtain all necessary licenses',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Pass health and safety inspection',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Menu Development
        {
            id: generateId(),
            name: 'Design signature menu with 20 items',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Test recipes with focus groups',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Source reliable food suppliers',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Calculate menu pricing for profit',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },

        // Team Building
        {
            id: generateId(),
            name: 'Hire experienced head chef',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Recruit 6 servers and 3 cooks',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Conduct staff training program',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create employee handbook',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Marketing Launch
        {
            id: generateId(),
            name: 'Design restaurant branding and logo',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build social media presence',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Host soft opening for friends/family',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Plan grand opening event',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Establish Physical Space',
            description: 'Setup functional restaurant facility',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create Compelling Menu',
            description: 'Develop delicious, profitable dishes',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build Quality Team',
            description: 'Hire and train excellent staff',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Launch with Impact',
            description: 'Generate buzz and attract customers',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const kpis: KPI[] = [
        {
            id: generateId(),
            name: 'Days Until Opening',
            target: 0,
            current: 45,
            unit: 'days',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Setup Tasks Complete',
            target: 100,
            current: 65,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Daily Customers (Target)',
            target: 80,
            current: 0,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Average Check Size',
            target: 45,
            current: 0,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Monthly Revenue',
            target: 100000,
            current: 0,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Customer Reviews',
            target: 4.5,
            current: 0,
            unit: '/5',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Staff Hired',
            target: 10,
            current: 4,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Social Media Followers',
            target: 1000,
            current: 120,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Opening Readiness',
            target: 10,
            current: 6.5,
            unit: '/10',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const goals: Goal[] = [
        {
            id: generateId(),
            name: 'Open Doors in 45 Days',
            description: 'Complete all setup and preparations for opening',
            kpiIds: [kpis[0].id, kpis[1].id, kpis[6].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Serve 80 Customers Daily',
            description: 'Build steady customer traffic',
            kpiIds: [kpis[2].id, kpis[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Achieve $100K Monthly Revenue',
            description: 'Reach profitability within 3 months',
            kpiIds: [kpis[4].id, kpis[5].id, kpis[7].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'Speed to Market',
            description: 'Open quickly while maintaining quality',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[0].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Food Excellence',
            description: 'Create memorable dining experiences',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Service Culture',
            description: 'Build team that delivers outstanding service',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[2].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Community Connection',
            description: 'Become beloved neighborhood spot',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[3].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const ogsm: OGSM = {
        id: generateId(),
        name: 'Small Restaurant Opening',
        objective:
            'Successfully open and launch our neighborhood restaurant within 45 days, serving 80 customers daily and reaching $100K in monthly revenue within 3 months by delivering exceptional food and service.',
        description: `# Restaurant Launch & Stabilization Plan

Open a neighborhood restaurant that becomes a beloved local destination through exceptional food quality, warm service, and strong community integration.

## Restaurant Concept

Small, focused menu emphasizing quality over variety. This approach allows:
- Mastery of each dish through repetition
- Efficient kitchen operations with less complexity
- Consistent quality control
- Lower food waste and inventory costs

The neighborhood positioning means we're not competing on novelty or Instagram-worthiness—we're building a place where locals eat regularly because the food is reliably excellent and the atmosphere feels like home.

## Financial Model

Target: 80 customers × $42 average check × 30 days = ~$100K monthly revenue

This requires building repeat customer base, not relying on one-time diners. Success comes from regulars who visit weekly, not tourists seeking trendy spots.

## 45-Day Opening Timeline

**Weeks 1-2**: Finalize location, permits, equipment installation
**Weeks 3-4**: Staff hiring and intensive training
**Weeks 5-6**: Soft opening with limited hours for operational refinement
**Week 7**: Grand opening with full schedule

The aggressive 45-day timeline requires parallel workstreams and decisive decision-making, but creates urgency that prevents endless perfectionism.

## Critical Success Factors

1. **Location**: High foot traffic area with parking and neighborhood walkability
2. **Team Quality**: Hire for attitude, train for skills
3. **Operational Excellence**: Systems and checklists for consistency
4. **Word-of-Mouth**: Exceed expectations so customers become advocates
5. **Cash Flow**: Manage daily operations to avoid running out of money in early months`,
        goalIds: goals.map((g) => g.id),
        strategyIds: strategies.map((s) => s.id),
        createdAt: now,
        updatedAt: now,
    };

    return { ogsm, goals, strategies, actions, tasks, kpis };
};
