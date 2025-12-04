/**
 * Strategy CRUD operations
 */

import type {
    Strategy,
    CreateStrategyInput,
    UpdateStrategyInput,
    StrategyWithDetails,
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
import { getActionsWithDetails } from './actions';

/**
 * Get all strategies
 */
export const getAllStrategies = async (): Promise<Strategy[]> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            return readFromStorage<Strategy>(STORAGE_KEYS.STRATEGIES);
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch strategies: ${error.message}`);
    }

    return result;
};

/**
 * Get strategy by ID
 */
export const getStrategyById = async (id: string): Promise<Strategy | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            const strategies = readFromStorage<Strategy>(
                STORAGE_KEYS.STRATEGIES
            );
            return strategies.find((strategy) => strategy.id === id) || null;
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch strategy: ${error.message}`);
    }

    return result;
};

/**
 * Get strategy with KPIs and actions populated
 */
export const getStrategyWithDetails = async (
    id: string
): Promise<StrategyWithDetails | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            const strategy = await getStrategyById(id);
            if (!strategy) return null;

            const dashboardKpis = await getKPIsByIds(strategy.dashboardKpiIds);
            const actions = await getActionsWithDetails(strategy.actionIds);

            return {
                ...strategy,
                dashboardKpis,
                actions,
            };
        })()
    );

    if (error) {
        throw new Error(
            `Failed to fetch strategy with details: ${error.message}`
        );
    }

    return result;
};

/**
 * Get multiple strategies by IDs
 */
export const getStrategiesByIds = async (
    ids: string[]
): Promise<Strategy[]> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            const strategies = readFromStorage<Strategy>(
                STORAGE_KEYS.STRATEGIES
            );
            return strategies.filter((strategy) => ids.includes(strategy.id));
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch strategies: ${error.message}`);
    }

    return result;
};

/**
 * Get multiple strategies with details
 */
export const getStrategiesWithDetails = async (
    ids: string[]
): Promise<StrategyWithDetails[]> => {
    const [result, error] = await tryCatch(
        (async () => {
            const strategies = await getStrategiesByIds(ids);

            const strategiesWithDetails = await Promise.all(
                strategies.map(async (strategy) => {
                    const dashboardKpis = await getKPIsByIds(
                        strategy.dashboardKpiIds
                    );
                    const actions = await getActionsWithDetails(
                        strategy.actionIds
                    );
                    return {
                        ...strategy,
                        dashboardKpis,
                        actions,
                    };
                })
            );

            return strategiesWithDetails;
        })()
    );

    if (error) {
        throw new Error(
            `Failed to fetch strategies with details: ${error.message}`
        );
    }

    return result;
};

/**
 * Create a new strategy
 */
export const createStrategy = async (
    input: CreateStrategyInput
): Promise<Strategy> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const now = getCurrentTimestamp();
            const newStrategy: Strategy = {
                ...input,
                id: generateId(),
                createdAt: now,
                updatedAt: now,
            };

            const strategies = readFromStorage<Strategy>(
                STORAGE_KEYS.STRATEGIES
            );
            strategies.push(newStrategy);
            writeToStorage(STORAGE_KEYS.STRATEGIES, strategies);

            return newStrategy;
        })()
    );

    if (error) {
        throw new Error(`Failed to create strategy: ${error.message}`);
    }

    return result;
};

/**
 * Update an existing strategy
 */
export const updateStrategy = async (
    id: string,
    input: UpdateStrategyInput
): Promise<Strategy | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const strategies = readFromStorage<Strategy>(
                STORAGE_KEYS.STRATEGIES
            );
            const index = strategies.findIndex(
                (strategy) => strategy.id === id
            );

            if (index === -1) {
                return null;
            }

            const updatedStrategy: Strategy = {
                ...strategies[index],
                ...input,
                updatedAt: getCurrentTimestamp(),
            };

            strategies[index] = updatedStrategy;
            writeToStorage(STORAGE_KEYS.STRATEGIES, strategies);

            return updatedStrategy;
        })()
    );

    if (error) {
        throw new Error(`Failed to update strategy: ${error.message}`);
    }

    return result;
};

/**
 * Delete a strategy
 */
export const deleteStrategy = async (id: string): Promise<boolean> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const strategies = readFromStorage<Strategy>(
                STORAGE_KEYS.STRATEGIES
            );
            const filteredStrategies = strategies.filter(
                (strategy) => strategy.id !== id
            );

            if (filteredStrategies.length === strategies.length) {
                return false; // Strategy not found
            }

            writeToStorage(STORAGE_KEYS.STRATEGIES, filteredStrategies);
            return true;
        })()
    );

    if (error) {
        throw new Error(`Failed to delete strategy: ${error.message}`);
    }

    return result;
};
