/**
 * Core data types for OGSM application
 */

/**
 * Task/Step within an Action
 */
export interface Task {
    id: string;
    name: string;
    status: 'pending' | 'in-progress' | 'completed';
    createdAt: string;
    updatedAt: string;
}

/**
 * Action within a Strategy
 */
export interface Action {
    id: string;
    name: string;
    description?: string;
    taskIds: string[]; // References to Task objects
    createdAt: string;
    updatedAt: string;
}

/**
 * Key Performance Indicator
 * Used by both Goals and Strategies
 */
export interface KPI {
    id: string;
    name: string;
    target: number;
    current: number;
    unit?: string; // e.g., "%", "count", "hours"
    createdAt: string;
    updatedAt: string;
}

/**
 * Goal within an OGSM
 */
export interface Goal {
    id: string;
    name: string;
    description?: string;
    kpiIds: string[]; // References to KPI objects
    createdAt: string;
    updatedAt: string;
}

/**
 * Strategy within an OGSM
 */
export interface Strategy {
    id: string;
    name: string;
    description?: string;
    dashboardKpiIds: string[]; // References to KPI objects
    actionIds: string[]; // References to Action objects
    createdAt: string;
    updatedAt: string;
}

/**
 * OGSM (Objective, Goals, Strategies, Measures) Plan
 */
export interface OGSM {
    id: string;
    name: string;
    objective: string;
    goalIds: string[]; // References to Goal objects
    strategyIds: string[]; // References to Strategy objects
    createdAt: string;
    updatedAt: string;
}

/**
 * Input types for creating new objects (without id, timestamps)
 */
export type CreateOGSMInput = Omit<OGSM, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateGoalInput = Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateKPIInput = Omit<KPI, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateStrategyInput = Omit<
    Strategy,
    'id' | 'createdAt' | 'updatedAt'
>;
export type CreateActionInput = Omit<Action, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Update types for partial updates
 */
export type UpdateOGSMInput = Partial<Omit<OGSM, 'id' | 'createdAt'>>;
export type UpdateGoalInput = Partial<Omit<Goal, 'id' | 'createdAt'>>;
export type UpdateKPIInput = Partial<Omit<KPI, 'id' | 'createdAt'>>;
export type UpdateStrategyInput = Partial<Omit<Strategy, 'id' | 'createdAt'>>;
export type UpdateActionInput = Partial<Omit<Action, 'id' | 'createdAt'>>;
export type UpdateTaskInput = Partial<Omit<Task, 'id' | 'createdAt'>>;

/**
 * Full OGSM with all nested objects populated
 * Used for convenience when displaying full data
 */
export interface OGSMWithDetails extends Omit<OGSM, 'goalIds' | 'strategyIds'> {
    goals: GoalWithDetails[];
    strategies: StrategyWithDetails[];
}

export interface GoalWithDetails extends Omit<Goal, 'kpiIds'> {
    kpis: KPI[];
}

export interface StrategyWithDetails extends Omit<
    Strategy,
    'dashboardKpiIds' | 'actionIds'
> {
    dashboardKpis: KPI[];
    actions: ActionWithDetails[];
}

export interface ActionWithDetails extends Omit<Action, 'taskIds'> {
    tasks: Task[];
}
