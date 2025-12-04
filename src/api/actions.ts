/**
 * Action CRUD operations
 */

import type {
    Action,
    CreateActionInput,
    UpdateActionInput,
    ActionWithDetails,
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
import { getTasksByIds } from './tasks';

/**
 * Get all actions
 */
export const getAllActions = async (): Promise<Action[]> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            return readFromStorage<Action>(STORAGE_KEYS.ACTIONS);
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch actions: ${error.message}`);
    }

    return result;
};

/**
 * Get action by ID
 */
export const getActionById = async (id: string): Promise<Action | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            const actions = readFromStorage<Action>(STORAGE_KEYS.ACTIONS);
            return actions.find((action) => action.id === id) || null;
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch action: ${error.message}`);
    }

    return result;
};

/**
 * Get action with tasks populated
 */
export const getActionWithDetails = async (
    id: string
): Promise<ActionWithDetails | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            const action = await getActionById(id);
            if (!action) return null;

            const tasks = await getTasksByIds(action.taskIds);

            return {
                ...action,
                tasks,
            };
        })()
    );

    if (error) {
        throw new Error(
            `Failed to fetch action with details: ${error.message}`
        );
    }

    return result;
};

/**
 * Get multiple actions by IDs
 */
export const getActionsByIds = async (ids: string[]): Promise<Action[]> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            const actions = readFromStorage<Action>(STORAGE_KEYS.ACTIONS);
            return actions.filter((action) => ids.includes(action.id));
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch actions: ${error.message}`);
    }

    return result;
};

/**
 * Get multiple actions with details
 */
export const getActionsWithDetails = async (
    ids: string[]
): Promise<ActionWithDetails[]> => {
    const [result, error] = await tryCatch(
        (async () => {
            const actions = await getActionsByIds(ids);

            const actionsWithDetails = await Promise.all(
                actions.map(async (action) => {
                    const tasks = await getTasksByIds(action.taskIds);
                    return {
                        ...action,
                        tasks,
                    };
                })
            );

            return actionsWithDetails;
        })()
    );

    if (error) {
        throw new Error(
            `Failed to fetch actions with details: ${error.message}`
        );
    }

    return result;
};

/**
 * Create a new action
 */
export const createAction = async (
    input: CreateActionInput
): Promise<Action> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const now = getCurrentTimestamp();
            const newAction: Action = {
                ...input,
                id: generateId(),
                createdAt: now,
                updatedAt: now,
            };

            const actions = readFromStorage<Action>(STORAGE_KEYS.ACTIONS);
            actions.push(newAction);
            writeToStorage(STORAGE_KEYS.ACTIONS, actions);

            return newAction;
        })()
    );

    if (error) {
        throw new Error(`Failed to create action: ${error.message}`);
    }

    return result;
};

/**
 * Update an existing action
 */
export const updateAction = async (
    id: string,
    input: UpdateActionInput
): Promise<Action | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const actions = readFromStorage<Action>(STORAGE_KEYS.ACTIONS);
            const index = actions.findIndex((action) => action.id === id);

            if (index === -1) {
                return null;
            }

            const updatedAction: Action = {
                ...actions[index],
                ...input,
                updatedAt: getCurrentTimestamp(),
            };

            actions[index] = updatedAction;
            writeToStorage(STORAGE_KEYS.ACTIONS, actions);

            return updatedAction;
        })()
    );

    if (error) {
        throw new Error(`Failed to update action: ${error.message}`);
    }

    return result;
};

/**
 * Delete an action
 */
export const deleteAction = async (id: string): Promise<boolean> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const actions = readFromStorage<Action>(STORAGE_KEYS.ACTIONS);
            const filteredActions = actions.filter(
                (action) => action.id !== id
            );

            if (filteredActions.length === actions.length) {
                return false; // Action not found
            }

            writeToStorage(STORAGE_KEYS.ACTIONS, filteredActions);
            return true;
        })()
    );

    if (error) {
        throw new Error(`Failed to delete action: ${error.message}`);
    }

    return result;
};
