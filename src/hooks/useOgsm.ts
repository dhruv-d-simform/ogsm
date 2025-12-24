/**
 * Custom React Query hooks for OGSM operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateOGSMInput, UpdateOGSMInput, OGSM } from '@/types';
import * as ogsmApi from '@/api/ogsm';
import { ogsmKeys } from '@/lib/queryKeys';
import { createOptimisticUpdateOptions } from '@/utils/optimisticUpdate';

/**
 * Hook to fetch all OGSM plans
 */
export const useOGSMs = () => {
    return useQuery({
        queryKey: ogsmKeys.lists(),
        queryFn: ogsmApi.getAllOGSMs,
    });
};

/**
 * Hook to fetch a single OGSM by ID
 */
export const useOGSM = (id: string) => {
    return useQuery({
        queryKey: ogsmKeys.detail(id),
        queryFn: () => ogsmApi.getOGSMById(id),
        enabled: !!id,
    });
};

/**
 * Hook to create a new OGSM
 */
export const useCreateOGSM = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CreateOGSMInput) => ogsmApi.createOGSM(input),
        onSuccess: async () => {
            // Invalidate and refetch OGSM list - await to ensure refetch completes
            await queryClient.invalidateQueries({ queryKey: ogsmKeys.lists() });
        },
    });
};

/**
 * Hook to update an existing OGSM
 */
export const useUpdateOGSM = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: string; input: UpdateOGSMInput }) =>
            ogsmApi.updateOGSM(id, input),
        ...createOptimisticUpdateOptions<OGSM, UpdateOGSMInput>({
            queryClient,
            getDetailKey: ogsmKeys.detail,
            getListKey: ogsmKeys.lists,
        }),
    });
};

/**
 * Hook to delete an OGSM
 */
export const useDeleteOGSM = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => ogsmApi.deleteOGSM(id),
        onSuccess: () => {
            // Invalidate and refetch OGSM list
            queryClient.invalidateQueries({ queryKey: ogsmKeys.lists() });
        },
    });
};
