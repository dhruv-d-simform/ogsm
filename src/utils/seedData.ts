/**
 * Seed data for OGSM application
 * Loads all mock OGSM datasets into localStorage
 */

import type { OGSM } from '@/types';
import {
    STORAGE_KEYS,
    writeToStorage,
    readFromStorage,
    generateId,
    getCurrentTimestamp,
} from './storage';
import { getAllMockData } from '@/mockData';

/**
 * Check if storage is empty
 */
export const isStorageEmpty = (): boolean => {
    const ogsms = readFromStorage<OGSM>(STORAGE_KEYS.OGSM);
    return ogsms.length === 0;
};

/**
 * Seed the database with initial data
 */
export const seedDatabase = (): void => {
    if (!isStorageEmpty()) {
        console.log('Storage already has data. Skipping seed.');
        return;
    }

    console.log('Seeding database with mock OGSM data...');

    // Get all mock data
    const mockData = getAllMockData(generateId, getCurrentTimestamp);

    // Write to storage
    writeToStorage(STORAGE_KEYS.TASKS, mockData.tasks);
    writeToStorage(STORAGE_KEYS.ACTIONS, mockData.actions);
    writeToStorage(STORAGE_KEYS.KPIS, mockData.kpis);
    writeToStorage(STORAGE_KEYS.GOALS, mockData.goals);
    writeToStorage(STORAGE_KEYS.STRATEGIES, mockData.strategies);
    writeToStorage(STORAGE_KEYS.OGSM, mockData.ogsms);

    console.log('✅ Database seeded successfully!');
    console.log(
        `Created: ${mockData.ogsms.length} OGSMs, ${mockData.goals.length} Goals, ${mockData.strategies.length} Strategies, ${mockData.actions.length} Actions, ${mockData.tasks.length} Tasks, ${mockData.kpis.length} KPIs`
    );
};
