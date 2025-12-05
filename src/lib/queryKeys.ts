/**
 * TanStack Query keys for cache management
 * Centralized location for all query keys used across the application
 */

/**
 * Query keys for OGSM operations
 */
export const ogsmKeys = {
    all: ['ogsm'] as const,
    lists: () => [...ogsmKeys.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
        [...ogsmKeys.lists(), filters] as const,
    details: () => [...ogsmKeys.all, 'detail'] as const,
    detail: (id: string) => [...ogsmKeys.details(), id] as const,
};

/**
 * Query keys for Goal operations
 */
export const goalKeys = {
    all: ['goal'] as const,
    lists: () => [...goalKeys.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
        [...goalKeys.lists(), filters] as const,
    details: () => [...goalKeys.all, 'detail'] as const,
    detail: (id: string) => [...goalKeys.details(), id] as const,
};

/**
 * Query keys for Strategy operations
 */
export const strategyKeys = {
    all: ['strategy'] as const,
    lists: () => [...strategyKeys.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
        [...strategyKeys.lists(), filters] as const,
    details: () => [...strategyKeys.all, 'detail'] as const,
    detail: (id: string) => [...strategyKeys.details(), id] as const,
};

/**
 * Query keys for KPI operations
 */
export const kpiKeys = {
    all: ['kpi'] as const,
    lists: () => [...kpiKeys.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
        [...kpiKeys.lists(), filters] as const,
    details: () => [...kpiKeys.all, 'detail'] as const,
    detail: (id: string) => [...kpiKeys.details(), id] as const,
};

/**
 * Query keys for Action operations
 */
export const actionKeys = {
    all: ['action'] as const,
    lists: () => [...actionKeys.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
        [...actionKeys.lists(), filters] as const,
    details: () => [...actionKeys.all, 'detail'] as const,
    detail: (id: string) => [...actionKeys.details(), id] as const,
};

/**
 * Query keys for Task operations
 */
export const taskKeys = {
    all: ['task'] as const,
    lists: () => [...taskKeys.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) =>
        [...taskKeys.lists(), filters] as const,
    details: () => [...taskKeys.all, 'detail'] as const,
    detail: (id: string) => [...taskKeys.details(), id] as const,
};
