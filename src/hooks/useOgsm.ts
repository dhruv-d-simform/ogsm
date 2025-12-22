/**
 * Custom React Query hooks for OGSM operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateOGSMInput, UpdateOGSMInput } from '@/types';
import * as ogsmApi from '@/api/ogsm';
import { ogsmKeys } from '@/lib/queryKeys';

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
        onSuccess: (_data, variables) => {
            // Invalidate and refetch both list and detail
            queryClient.invalidateQueries({ queryKey: ogsmKeys.lists() });
            queryClient.invalidateQueries({
                queryKey: ogsmKeys.detail(variables.id),
            });
        },
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
