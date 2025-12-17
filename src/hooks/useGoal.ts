/**
 * Custom React Query hooks for Goal operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateGoalInput, UpdateGoalInput, Goal } from '@/types';
import * as goalApi from '@/api/goals';
import { goalKeys } from '@/lib/queryKeys';

/**
 * Hook to fetch all goals
 */
export const useGoals = () => {
    return useQuery({
        queryKey: goalKeys.lists(),
        queryFn: goalApi.getAllGoals,
    });
};

/**
 * Hook to fetch a single goal by ID
 */
export const useGoal = (id: string) => {
    return useQuery({
        queryKey: goalKeys.detail(id),
        queryFn: () => goalApi.getGoalById(id),
        enabled: !!id,
    });
};

/**
 * Hook to fetch multiple goals by IDs
 */
export const useGoalsByIds = (ids: string[]) => {
    return useQuery({
        queryKey: goalKeys.list({ ids }),
        queryFn: () => goalApi.getGoalsByIds(ids),
        enabled: ids.length > 0,
    });
};

/**
 * Hook to create a new goal
 */
export const useCreateGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CreateGoalInput) => goalApi.createGoal(input),
        onSuccess: () => {
            // Invalidate and refetch goal list
            queryClient.invalidateQueries({ queryKey: goalKeys.lists() });
        },
    });
};

/**
 * Hook to update an existing goal
 */
export const useUpdateGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: string; input: UpdateGoalInput }) =>
            goalApi.updateGoal(id, input),
        onMutate: async ({ id, input }) => {
            // Cancel any outgoing refetches to avoid overwriting optimistic update
            await queryClient.cancelQueries({ queryKey: goalKeys.detail(id) });

            // Snapshot the previous value
            const previousGoal = queryClient.getQueryData<Goal>(
                goalKeys.detail(id)
            );

            // Optimistically update to the new value
            queryClient.setQueryData<Goal>(goalKeys.detail(id), (old) => {
                if (!old) return old;
                return { ...old, ...input };
            });

            // Return context with the previous value
            return { previousGoal, id };
        },
        onError: (_err, _variables, context) => {
            // If mutation fails, rollback to the previous value
            if (context?.previousGoal) {
                queryClient.setQueryData(
                    goalKeys.detail(context.id),
                    context.previousGoal
                );
            }
        },
        onSettled: (_data, _error, variables) => {
            // Always refetch after error or success to ensure we have the latest data
            queryClient.invalidateQueries({
                queryKey: goalKeys.detail(variables.id),
            });
            queryClient.invalidateQueries({ queryKey: goalKeys.lists() });
        },
    });
};

/**
 * Hook to delete a goal
 */
export const useDeleteGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => goalApi.deleteGoal(id),
        onSuccess: () => {
            // Invalidate and refetch goal list
            queryClient.invalidateQueries({ queryKey: goalKeys.lists() });
        },
    });
};
