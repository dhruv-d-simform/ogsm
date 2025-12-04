/**
 * Goal CRUD operations
 */

import type {
    Goal,
    CreateGoalInput,
    UpdateGoalInput,
    GoalWithDetails,
} from '@/types';
import {
    STORAGE_KEYS,
    readFromStorage,
    writeToStorage,
    generateId,
    getCurrentTimestamp,
    simulateApiDelay,
} from '@/utils/storage';
import { tryCatch } from '@/utils/tryCatch';
import { getKPIsByIds } from './kpis';

/**
 * Get all goals
 */
export const getAllGoals = async (): Promise<Goal[]> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            return readFromStorage<Goal>(STORAGE_KEYS.GOALS);
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch goals: ${error.message}`);
    }

    return result;
};

/**
 * Get goal by ID
 */
export const getGoalById = async (id: string): Promise<Goal | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            const goals = readFromStorage<Goal>(STORAGE_KEYS.GOALS);
            return goals.find((goal) => goal.id === id) || null;
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch goal: ${error.message}`);
    }

    return result;
};

/**
 * Get goal with KPIs populated
 */
export const getGoalWithDetails = async (
    id: string
): Promise<GoalWithDetails | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            const goal = await getGoalById(id);
            if (!goal) return null;

            const kpis = await getKPIsByIds(goal.kpiIds);

            return {
                ...goal,
                kpis,
            };
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch goal with details: ${error.message}`);
    }

    return result;
};

/**
 * Get multiple goals by IDs
 */
export const getGoalsByIds = async (ids: string[]): Promise<Goal[]> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            const goals = readFromStorage<Goal>(STORAGE_KEYS.GOALS);
            return goals.filter((goal) => ids.includes(goal.id));
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch goals: ${error.message}`);
    }

    return result;
};

/**
 * Get multiple goals with details
 */
export const getGoalsWithDetails = async (
    ids: string[]
): Promise<GoalWithDetails[]> => {
    const [result, error] = await tryCatch(
        (async () => {
            const goals = await getGoalsByIds(ids);

            const goalsWithDetails = await Promise.all(
                goals.map(async (goal) => {
                    const kpis = await getKPIsByIds(goal.kpiIds);
                    return {
                        ...goal,
                        kpis,
                    };
                })
            );

            return goalsWithDetails;
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch goals with details: ${error.message}`);
    }

    return result;
};

/**
 * Create a new goal
 */
export const createGoal = async (input: CreateGoalInput): Promise<Goal> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const now = getCurrentTimestamp();
            const newGoal: Goal = {
                ...input,
                id: generateId(),
                createdAt: now,
                updatedAt: now,
            };

            const goals = readFromStorage<Goal>(STORAGE_KEYS.GOALS);
            goals.push(newGoal);
            writeToStorage(STORAGE_KEYS.GOALS, goals);

            return newGoal;
        })()
    );

    if (error) {
        throw new Error(`Failed to create goal: ${error.message}`);
    }

    return result;
};

/**
 * Update an existing goal
 */
export const updateGoal = async (
    id: string,
    input: UpdateGoalInput
): Promise<Goal | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const goals = readFromStorage<Goal>(STORAGE_KEYS.GOALS);
            const index = goals.findIndex((goal) => goal.id === id);

            if (index === -1) {
                return null;
            }

            const updatedGoal: Goal = {
                ...goals[index],
                ...input,
                updatedAt: getCurrentTimestamp(),
            };

            goals[index] = updatedGoal;
            writeToStorage(STORAGE_KEYS.GOALS, goals);

            return updatedGoal;
        })()
    );

    if (error) {
        throw new Error(`Failed to update goal: ${error.message}`);
    }

    return result;
};

/**
 * Delete a goal
 */
export const deleteGoal = async (id: string): Promise<boolean> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const goals = readFromStorage<Goal>(STORAGE_KEYS.GOALS);
            const filteredGoals = goals.filter((goal) => goal.id !== id);

            if (filteredGoals.length === goals.length) {
                return false; // Goal not found
            }

            writeToStorage(STORAGE_KEYS.GOALS, filteredGoals);
            return true;
        })()
    );

    if (error) {
        throw new Error(`Failed to delete goal: ${error.message}`);
    }

    return result;
};
