/**
 * localStorage utility helpers with versioned keys
 */

/**
 * Storage keys with version numbers for future migrations
 */
export const STORAGE_KEYS = {
    OGSM: 'ogsm_v1',
    GOALS: 'goals_v1',
    KPIS: 'kpis_v1',
    STRATEGIES: 'strategies_v1',
    ACTIONS: 'actions_v1',
    TASKS: 'tasks_v1',
} as const;

/**
 * Simulated API delay in milliseconds
 */
const API_DELAY = 100;

/**
 * Simulate async API call with a small delay
 */
export const simulateApiDelay = (): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, API_DELAY));
};

/**
 * Read data from localStorage
 */
export const readFromStorage = <T>(key: string): T[] => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`Error reading from localStorage key "${key}":`, error);
        return [];
    }
};

/**
 * Write data to localStorage
 */
export const writeToStorage = <T>(key: string, data: T[]): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error writing to localStorage key "${key}":`, error);
        throw new Error(`Failed to save data to localStorage: ${error}`);
    }
};

/**
 * Clear all OGSM-related data from localStorage
 */
export const clearAllStorage = (): void => {
    Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
    });
};

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get current timestamp in ISO format
 */
export const getCurrentTimestamp = (): string => {
    return new Date().toISOString();
};
