/**
 * Custom React Query hooks for Action operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateActionInput, UpdateActionInput, Action } from '@/types';
import * as actionApi from '@/api/actions';
import { actionKeys } from '@/lib/queryKeys';

/**
 * Hook to fetch all actions
 */
export const useActions = () => {
    return useQuery({
        queryKey: actionKeys.lists(),
        queryFn: actionApi.getAllActions,
    });
};

/**
 * Hook to fetch a single action by ID
 */
export const useAction = (id: string) => {
    return useQuery({
        queryKey: actionKeys.detail(id),
        queryFn: () => actionApi.getActionById(id),
        enabled: !!id,
    });
};

/**
 * Hook to fetch multiple actions by IDs
 */
export const useActionsByIds = (ids: string[]) => {
    return useQuery({
        queryKey: actionKeys.list({ ids }),
        queryFn: () => actionApi.getActionsByIds(ids),
        enabled: ids.length > 0,
    });
};

/**
 * Hook to create a new action
 */
export const useCreateAction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CreateActionInput) => actionApi.createAction(input),
        onSuccess: () => {
            // Invalidate and refetch action list
            queryClient.invalidateQueries({ queryKey: actionKeys.lists() });
        },
    });
};

/**
 * Hook to update an existing action
 */
export const useUpdateAction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: string; input: UpdateActionInput }) =>
            actionApi.updateAction(id, input),
        onMutate: async ({ id, input }) => {
            // Cancel any outgoing refetches to avoid overwriting optimistic update
            await queryClient.cancelQueries({
                queryKey: actionKeys.detail(id),
            });

            // Snapshot the previous value
            const previousAction = queryClient.getQueryData<Action>(
                actionKeys.detail(id)
            );

            // Optimistically update to the new value
            queryClient.setQueryData<Action>(actionKeys.detail(id), (old) => {
                if (!old) return old;
                return { ...old, ...input };
            });

            // Return context with the previous value
            return { previousAction, id };
        },
        onError: (_err, _variables, context) => {
            // If mutation fails, rollback to the previous value
            if (context?.previousAction) {
                queryClient.setQueryData(
                    actionKeys.detail(context.id),
                    context.previousAction
                );
            }
        },
        onSettled: (_data, _error, variables) => {
            // Always refetch after error or success to ensure we have the latest data
            queryClient.invalidateQueries({
                queryKey: actionKeys.detail(variables.id),
            });
            queryClient.invalidateQueries({ queryKey: actionKeys.lists() });
        },
    });
};

/**
 * Hook to delete an action
 */
export const useDeleteAction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => actionApi.deleteAction(id),
        onSuccess: () => {
            // Invalidate and refetch action list
            queryClient.invalidateQueries({ queryKey: actionKeys.lists() });
        },
    });
};
