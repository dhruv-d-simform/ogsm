/**
 * OGSM: Online Course Creation
 * Creating and selling an online course on web development
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';

export const createOnlineCourseData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
) => {
    const now = getCurrentTimestamp();

    const tasks: Task[] = [
        // Course Planning
        {
            id: generateId(),
            name: 'Survey audience to validate idea',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create detailed course outline',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Write learning objectives for each module',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Design course curriculum with 8 modules',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },

        // Content Creation
        {
            id: generateId(),
            name: 'Record 50 video lessons',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create code examples and projects',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Design downloadable resources',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Write quizzes for each module',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Platform Setup
        {
            id: generateId(),
            name: 'Choose Teachable as course platform',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Design course sales page',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Setup payment processing',
            status: 'completed',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create student community forum',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Pre-Launch
        {
            id: generateId(),
            name: 'Run beta cohort with 20 students',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Collect testimonials from beta students',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build email list of 500 prospects',
            status: 'in-progress',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create launch webinar',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },

        // Marketing
        {
            id: generateId(),
            name: 'Publish free mini-course as lead magnet',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Partner with 3 influencers for promotion',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Create YouTube marketing videos',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Run Facebook ads for launch',
            status: 'pending',
            createdAt: now,
            updatedAt: now,
        },
    ];

    const actions: Action[] = [
        {
            id: generateId(),
            name: 'Design Effective Curriculum',
            description: 'Create structured learning path',
            taskIds: [tasks[0].id, tasks[1].id, tasks[2].id, tasks[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Produce Quality Content',
            description: 'Create comprehensive course materials',
            taskIds: [tasks[4].id, tasks[5].id, tasks[6].id, tasks[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Build Course Platform',
            description: 'Setup professional learning environment',
            taskIds: [tasks[8].id, tasks[9].id, tasks[10].id, tasks[11].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Validate with Beta',
            description: 'Test course with real students',
            taskIds: [tasks[12].id, tasks[13].id, tasks[14].id, tasks[15].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Execute Launch',
            description: 'Market course to target audience',
            taskIds: [tasks[16].id, tasks[17].id, tasks[18].id, tasks[19].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const kpis: KPI[] = [
        {
            id: generateId(),
            name: 'Course Completion',
            target: 100,
            current: 45,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Video Lessons Created',
            target: 50,
            current: 22,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Students Enrolled',
            target: 200,
            current: 0,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Course Revenue',
            target: 40000,
            current: 0,
            unit: '$',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Student Satisfaction',
            target: 4.7,
            current: 0,
            unit: '/5',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Course Completion Rate',
            target: 65,
            current: 0,
            unit: '%',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Email List Size',
            target: 1000,
            current: 180,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Launch Webinar Attendees',
            target: 300,
            current: 0,
            unit: 'count',
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Course Quality Score',
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
            name: 'Create Comprehensive Course',
            description: 'Build 50-lesson professional course',
            kpiIds: [kpis[0].id, kpis[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Enroll 200 Students',
            description: 'Successfully launch to target audience',
            kpiIds: [kpis[2].id, kpis[6].id, kpis[7].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Generate $40K in Revenue',
            description: 'Earn income from course sales',
            kpiIds: [kpis[3].id, kpis[4].id, kpis[5].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const strategies: Strategy[] = [
        {
            id: generateId(),
            name: 'Outcome-Focused Design',
            description: 'Prioritize practical results over theory',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[0].id, actions[1].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Beta Validation',
            description: 'Perfect course based on real feedback',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[2].id, actions[3].id],
            createdAt: now,
            updatedAt: now,
        },
        {
            id: generateId(),
            name: 'Launch Campaign',
            description: 'Create excitement and urgency for launch',
            dashboardKpiIds: [kpis[8].id],
            actionIds: [actions[4].id],
            createdAt: now,
            updatedAt: now,
        },
    ];

    const ogsm: OGSM = {
        id: generateId(),
        name: 'Online Course Creation',
        objective:
            'Create and successfully launch a comprehensive web development course, enrolling 200 students and generating $40,000 in revenue within 6 months while helping students achieve real career outcomes.',
        description: `# Online Course Creation & Launch

Build and successfully market a high-quality web development course that delivers genuine value to students while establishing a sustainable education business.

## Market Opportunity

The online learning market for web development is substantial, but success requires differentiation. Our competitive advantage is practical, project-based learning that prepares students for real jobs—not just covering syntax.

## Course Economics

Target: 200 students × $200 per enrollment = $40,000 revenue

This pricing positions the course as a premium offering (not a $29 impulse buy) while remaining accessible compared to bootcamps ($5,000-$15,000). The higher price signals quality and attracts more serious, committed students.

## Content Strategy

The course must deliver exceptional value to justify premium pricing and generate positive word-of-mouth:

- **Project-Based Learning**: Students build 5 real portfolio projects
- **Modern Stack**: Focus on in-demand technologies (React, Node.js, databases)
- **Career Support**: Resume reviews, portfolio guidance, interview prep
- **Community Access**: Private Discord for peer learning and support

## Launch Playbook

1. **Build in Public**: Share course creation journey to build audience
2. **Beta Launch**: Offer to 50 students at discount for feedback and testimonials
3. **Full Launch**: Leverage testimonials and refined content for public launch
4. **Continuous Marketing**: Content marketing, social proof, and student success stories

## Success Beyond Revenue

While $40K is the financial target, true success means students getting jobs, building projects, and genuinely learning—creating advocates who refer others and validate the course's value.`,
        goalIds: goals.map((g) => g.id),
        strategyIds: strategies.map((s) => s.id),
        createdAt: now,
        updatedAt: now,
    };

    return { ogsm, goals, strategies, actions, tasks, kpis };
};
