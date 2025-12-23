/**
 * OGSM: E-commerce Store Launch
 * Launching an online store selling handmade products
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';

export const createEcommerceStoreData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
) => {
    const now = getCurrentTimestamp();

    const tasks: Task[] = [
        // Store Setup
        {
            id: generateId(),
            name: 'Choose Shopify plan and domain name',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Design store theme and branding',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Set up payment processing',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Configure shipping options',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },

        // Product Development
        {
            id: generateId(),
            name: 'Create 30 initial product designs',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Source quality materials',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Photograph products professionally',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Write compelling product descriptions',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Marketing Setup
        {
            id: generateId(),
            name: 'Build Instagram and Pinterest presence',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create email marketing sequences',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Set up Google and Facebook ads',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Partner with 5 micro-influencers',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Operations
        {
            id: generateId(),
            name: 'Organize production workflow',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create inventory management system',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Design packaging and unboxing experience',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Setup customer service process',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Build Professional Store',
            description: 'Create trustworthy, attractive online shop',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Develop Product Line',
            description: 'Create beautiful, high-quality products',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Drive Traffic',
            description: 'Attract potential customers to store',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Scale Operations',
            description: 'Handle orders efficiently and professionally',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const kpis: KPI[] = [
        {
            id: generateId(),
            name: 'Products Listed',
            target: 30,
            current: 12,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Store Visitors (Monthly)',
            target: 5000,
            current: 0,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Conversion Rate',
            target: 3,
            current: 0,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Average Order Value',
            target: 65,
            current: 0,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Monthly Sales',
            target: 10000,
            current: 0,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Customer Reviews',
            target: 4.7,
            current: 0,
            unit: '/5',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Return Customer Rate',
            target: 30,
            current: 0,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Social Media Followers',
            target: 3000,
            current: 245,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Business Momentum',
            target: 8,
            current: 5,
            unit: '/10',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const goals: Goal[] = [
        {
            id: generateId(),
            name: 'Launch with 30 Products',
            description: 'Open store with diverse product selection',
            kpiIds: [kpis[0].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Reach 5K Monthly Visitors',
            description: 'Build consistent traffic to the store',
            kpiIds: [kpis[1].id, kpis[2].id, kpis[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Generate $10K Monthly Sales',
            description: 'Achieve sustainable income within 6 months',
            kpiIds: [kpis[3].id, kpis[4].id, kpis[5].id, kpis[6].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'Product-First Approach',
            description: 'Create products people genuinely love',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Visual Storytelling',
            description: 'Use beautiful imagery and social media',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[0].id, actions[2].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Exceptional Experience',
            description: 'Delight customers at every touchpoint',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[3].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const ogsm: OGSM = {
        id: generateId(),
        name: 'E-commerce Store Launch',
        objective:
            'Launch a successful e-commerce store selling handmade products, reaching 5,000 monthly visitors and generating $10,000 in monthly sales within 6 months through beautiful products and exceptional customer experience.',
        description: `# E-commerce Store Launch Plan

Transform a handmade products hobby into a thriving online business by building a professional e-commerce presence that converts browsers into loyal customers.

## Market Position

The handmade market is growing rapidly, with consumers increasingly valuing authentic, artisan-crafted products over mass-produced alternatives. Our unique product line and storytelling approach will differentiate us in this competitive but opportunity-rich market.

## Launch Strategy

This 6-month plan focuses on three critical phases:

1. **Foundation (Months 1-2)**: Build a conversion-optimized store with professional product photography and compelling copy
2. **Traffic Acquisition (Months 3-4)**: Deploy multi-channel marketing to drive qualified visitors
3. **Optimization & Scale (Months 5-6)**: Refine based on data, improve conversion rates, and scale what works

## Revenue Model

With an average order value target of $75 and a 2.5% conversion rate, reaching 5,000 monthly visitors will generate approximately $9,375 in monthly revenue, positioning us well to exceed our $10,000 goal as we optimize.

## Competitive Advantages

- **Authentic Storytelling**: Share the craft and passion behind each product
- **Quality Commitment**: Premium materials and exceptional craftsmanship
- **Customer Experience**: White-glove service from browsing to unboxing
- **Community Building**: Create a loyal following through content and engagement`,
        goalIds: goals.map((g) => g.id),
        strategyIds: strategies.map((s) => s.id),
        createdAt: now,
        updatedAt: now,
    };

    return { ogsm, goals, strategies, actions, tasks, kpis };
};
