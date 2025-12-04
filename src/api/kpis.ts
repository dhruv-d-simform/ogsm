/**
 * KPI CRUD operations
 */

import type { KPI, CreateKPIInput, UpdateKPIInput } from '@/types';
import {
    STORAGE_KEYS,
    readFromStorage,
    writeToStorage,
    generateId,
    getCurrentTimestamp,
    simulateApiDelay,
} from '@/utils/storage';
import { tryCatch } from '@/utils/tryCatch';

/**
 * Get all KPIs
 */
export const getAllKPIs = async (): Promise<KPI[]> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            return readFromStorage<KPI>(STORAGE_KEYS.KPIS);
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch KPIs: ${error.message}`);
    }

    return result;
};

/**
 * Get KPI by ID
 */
export const getKPIById = async (id: string): Promise<KPI | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            const kpis = readFromStorage<KPI>(STORAGE_KEYS.KPIS);
            return kpis.find((kpi) => kpi.id === id) || null;
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch KPI: ${error.message}`);
    }

    return result;
};

/**
 * Get multiple KPIs by IDs
 */
export const getKPIsByIds = async (ids: string[]): Promise<KPI[]> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            const kpis = readFromStorage<KPI>(STORAGE_KEYS.KPIS);
            return kpis.filter((kpi) => ids.includes(kpi.id));
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch KPIs: ${error.message}`);
    }

    return result;
};

/**
 * Create a new KPI
 */
export const createKPI = async (input: CreateKPIInput): Promise<KPI> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const now = getCurrentTimestamp();
            const newKPI: KPI = {
                ...input,
                id: generateId(),
                createdAt: now,
                updatedAt: now,
            };

            const kpis = readFromStorage<KPI>(STORAGE_KEYS.KPIS);
            kpis.push(newKPI);
            writeToStorage(STORAGE_KEYS.KPIS, kpis);

            return newKPI;
        })()
    );

    if (error) {
        throw new Error(`Failed to create KPI: ${error.message}`);
    }

    return result;
};

/**
 * Update an existing KPI
 */
export const updateKPI = async (
    id: string,
    input: UpdateKPIInput
): Promise<KPI | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const kpis = readFromStorage<KPI>(STORAGE_KEYS.KPIS);
            const index = kpis.findIndex((kpi) => kpi.id === id);

            if (index === -1) {
                return null;
            }

            const updatedKPI: KPI = {
                ...kpis[index],
                ...input,
                updatedAt: getCurrentTimestamp(),
            };

            kpis[index] = updatedKPI;
            writeToStorage(STORAGE_KEYS.KPIS, kpis);

            return updatedKPI;
        })()
    );

    if (error) {
        throw new Error(`Failed to update KPI: ${error.message}`);
    }

    return result;
};

/**
 * Delete a KPI
 */
export const deleteKPI = async (id: string): Promise<boolean> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const kpis = readFromStorage<KPI>(STORAGE_KEYS.KPIS);
            const filteredKPIs = kpis.filter((kpi) => kpi.id !== id);

            if (filteredKPIs.length === kpis.length) {
                return false; // KPI not found
            }

            writeToStorage(STORAGE_KEYS.KPIS, filteredKPIs);
            return true;
        })()
    );

    if (error) {
        throw new Error(`Failed to delete KPI: ${error.message}`);
    }

    return result;
};
