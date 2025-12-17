import type { QueryClient, QueryKey } from '@tanstack/react-query';

/**
 * Configuration for creating optimistic update mutation options.
 */
export interface OptimisticUpdateConfig {
    /** QueryClient instance from React Query */
    queryClient: QueryClient;
    /** Function to generate the detail query key for a specific item */
    getDetailKey: (id: string) => QueryKey;
    /** Function to generate the list query key */
    getListKey: () => QueryKey;
}

/**
 * Creates optimistic update mutation options for React Query.
 *
 * This helper reduces code duplication by providing a reusable pattern for
 * optimistic updates across different entity types (Goal, Action, etc.).
 *
 * @template TData - The entity type (e.g., Goal, Action)
 * @template TInput - The update input type (e.g., UpdateGoalInput, UpdateActionInput)
 *
 * @param config - Configuration object with queryClient and query key generators
 * @returns Mutation options object with onMutate, onError, and onSettled handlers
 *
 * @example
 * ```typescript
 * export const useUpdateGoal = () => {
 *   const queryClient = useQueryClient();
 *
 *   return useMutation({
 *     mutationFn: ({ id, input }) => goalApi.updateGoal(id, input),
 *     ...createOptimisticUpdateOptions<Goal, UpdateGoalInput>({
 *       queryClient,
 *       getDetailKey: goalKeys.detail,
 *       getListKey: goalKeys.lists,
 *     }),
 *   });
 * };
 * ```
 */
export function createOptimisticUpdateOptions<TData, TInput>({
    queryClient,
    getDetailKey,
    getListKey,
}: OptimisticUpdateConfig) {
    return {
        onMutate: async ({ id, input }: { id: string; input: TInput }) => {
            // Cancel any outgoing refetches to avoid overwriting optimistic update
            await queryClient.cancelQueries({ queryKey: getDetailKey(id) });

            // Snapshot the previous value
            const previousData = queryClient.getQueryData<TData>(
                getDetailKey(id)
            );

            // Optimistically update to the new value
            queryClient.setQueryData<TData>(getDetailKey(id), (old) => {
                if (!old) return old;
                return { ...old, ...input } as TData;
            });

            // Return context with the previous value
            return { previousData, id };
        },
        onError: (
            _err: unknown,
            _variables: { id: string; input: TInput },
            context?: { previousData: TData | undefined; id: string }
        ) => {
            // If mutation fails, rollback to the previous value
            if (context?.previousData) {
                queryClient.setQueryData(
                    getDetailKey(context.id),
                    context.previousData
                );
            }
        },
        onSettled: (
            _data: unknown,
            _error: unknown,
            variables: { id: string; input: TInput }
        ) => {
            // Always refetch after error or success to ensure we have the latest data
            queryClient.invalidateQueries({
                queryKey: getDetailKey(variables.id),
            });
            queryClient.invalidateQueries({ queryKey: getListKey() });
        },
    };
}
