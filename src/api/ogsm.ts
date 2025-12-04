/**
 * OGSM CRUD operations
 */

import type { OGSM, CreateOGSMInput, UpdateOGSMInput } from '@/types';
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
 * Get all OGSM plans
 */
export const getAllOGSMs = async (): Promise<OGSM[]> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            return readFromStorage<OGSM>(STORAGE_KEYS.OGSM);
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch OGSMs: ${error.message}`);
    }

    return result;
};

/**
 * Get OGSM by ID
 */
export const getOGSMById = async (id: string): Promise<OGSM | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            const ogsms = readFromStorage<OGSM>(STORAGE_KEYS.OGSM);
            return ogsms.find((ogsm) => ogsm.id === id) || null;
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch OGSM: ${error.message}`);
    }

    return result;
};

/**
 * Create a new OGSM
 */
export const createOGSM = async (input: CreateOGSMInput): Promise<OGSM> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const now = getCurrentTimestamp();
            const newOGSM: OGSM = {
                ...input,
                id: generateId(),
                createdAt: now,
                updatedAt: now,
            };

            const ogsms = readFromStorage<OGSM>(STORAGE_KEYS.OGSM);
            ogsms.push(newOGSM);
            writeToStorage(STORAGE_KEYS.OGSM, ogsms);

            return newOGSM;
        })()
    );

    if (error) {
        throw new Error(`Failed to create OGSM: ${error.message}`);
    }

    return result;
};

/**
 * Update an existing OGSM
 */
export const updateOGSM = async (
    id: string,
    input: UpdateOGSMInput
): Promise<OGSM | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const ogsms = readFromStorage<OGSM>(STORAGE_KEYS.OGSM);
            const index = ogsms.findIndex((ogsm) => ogsm.id === id);

            if (index === -1) {
                return null;
            }

            const updatedOGSM: OGSM = {
                ...ogsms[index],
                ...input,
                updatedAt: getCurrentTimestamp(),
            };

            ogsms[index] = updatedOGSM;
            writeToStorage(STORAGE_KEYS.OGSM, ogsms);

            return updatedOGSM;
        })()
    );

    if (error) {
        throw new Error(`Failed to update OGSM: ${error.message}`);
    }

    return result;
};

/**
 * Delete an OGSM
 */
export const deleteOGSM = async (id: string): Promise<boolean> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const ogsms = readFromStorage<OGSM>(STORAGE_KEYS.OGSM);
            const filteredOGSMs = ogsms.filter((ogsm) => ogsm.id !== id);

            if (filteredOGSMs.length === ogsms.length) {
                return false; // OGSM not found
            }

            writeToStorage(STORAGE_KEYS.OGSM, filteredOGSMs);
            return true;
        })()
    );

    if (error) {
        throw new Error(`Failed to delete OGSM: ${error.message}`);
    }

    return result;
};
