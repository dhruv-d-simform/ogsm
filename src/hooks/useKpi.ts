/**
 * Custom React Query hooks for KPI operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateKPIInput, UpdateKPIInput } from '@/types';
import * as kpiApi from '@/api/kpis';
import { kpiKeys } from '@/lib/queryKeys';

/**
 * Hook to fetch all KPIs
 */
export const useKPIs = () => {
    return useQuery({
        queryKey: kpiKeys.lists(),
        queryFn: kpiApi.getAllKPIs,
    });
};

/**
 * Hook to fetch a single KPI by ID
 */
export const useKPI = (id: string) => {
    return useQuery({
        queryKey: kpiKeys.detail(id),
        queryFn: () => kpiApi.getKPIById(id),
        enabled: !!id,
    });
};

/**
 * Hook to fetch multiple KPIs by IDs
 */
export const useKPIsByIds = (ids: string[]) => {
    return useQuery({
        queryKey: kpiKeys.list({ ids }),
        queryFn: () => kpiApi.getKPIsByIds(ids),
        enabled: ids.length > 0,
    });
};

/**
 * Hook to create a new KPI
 */
export const useCreateKPI = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CreateKPIInput) => kpiApi.createKPI(input),
        onSuccess: () => {
            // Invalidate and refetch KPI list
            queryClient.invalidateQueries({ queryKey: kpiKeys.lists() });
        },
    });
};

/**
 * Hook to update an existing KPI
 */
export const useUpdateKPI = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: string; input: UpdateKPIInput }) =>
            kpiApi.updateKPI(id, input),
        onSuccess: (_data, variables) => {
            // Invalidate and refetch both list and detail
            queryClient.invalidateQueries({ queryKey: kpiKeys.lists() });
            queryClient.invalidateQueries({
                queryKey: kpiKeys.detail(variables.id),
            });
        },
    });
};

/**
 * Hook to delete a KPI
 */
export const useDeleteKPI = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => kpiApi.deleteKPI(id),
        onSuccess: () => {
            // Invalidate and refetch KPI list
            queryClient.invalidateQueries({ queryKey: kpiKeys.lists() });
        },
    });
};
