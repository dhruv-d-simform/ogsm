/**
 * Custom React Query hooks for Strategy operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
    CreateStrategyInput,
    UpdateStrategyInput,
    Strategy,
} from '@/types';
import * as strategyApi from '@/api/strategies';
import { strategyKeys } from '@/lib/queryKeys';
import { createOptimisticUpdateOptions } from '@/utils/optimisticUpdate';

/**
 * Hook to fetch all strategies
 */
export const useStrategies = () => {
    return useQuery({
        queryKey: strategyKeys.lists(),
        queryFn: strategyApi.getAllStrategies,
    });
};

/**
 * Hook to fetch a single strategy by ID
 */
export const useStrategy = (id: string) => {
    return useQuery({
        queryKey: strategyKeys.detail(id),
        queryFn: () => strategyApi.getStrategyById(id),
        enabled: !!id,
    });
};

/**
 * Hook to fetch multiple strategies by IDs
 */
export const useStrategiesByIds = (ids: string[]) => {
    return useQuery({
        queryKey: strategyKeys.list({ ids }),
        queryFn: () => strategyApi.getStrategiesByIds(ids),
        enabled: ids.length > 0,
    });
};

/**
 * Hook to create a new strategy
 */
export const useCreateStrategy = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CreateStrategyInput) =>
            strategyApi.createStrategy(input),
        onSuccess: () => {
            // Invalidate and refetch strategy list
            queryClient.invalidateQueries({ queryKey: strategyKeys.lists() });
        },
    });
};

/**
 * Hook to update an existing strategy
 */
export const useUpdateStrategy = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            input,
        }: {
            id: string;
            input: UpdateStrategyInput;
        }) => strategyApi.updateStrategy(id, input),
        ...createOptimisticUpdateOptions<Strategy, UpdateStrategyInput>({
            queryClient,
            getDetailKey: strategyKeys.detail,
            getListKey: strategyKeys.lists,
        }),
    });
};

/**
 * Hook to delete a strategy
 */
export const useDeleteStrategy = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => strategyApi.deleteStrategy(id),
        onSuccess: () => {
            // Invalidate and refetch strategy list
            queryClient.invalidateQueries({ queryKey: strategyKeys.lists() });
        },
    });
};
