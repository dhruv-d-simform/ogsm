/**
 * Custom React Query hooks for Task operations
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateTaskInput, UpdateTaskInput } from '@/types';
import * as taskApi from '@/api/tasks';
import { taskKeys } from '@/lib/queryKeys';

/**
 * Hook to fetch all tasks
 */
export const useTasks = () => {
    return useQuery({
        queryKey: taskKeys.lists(),
        queryFn: taskApi.getAllTasks,
    });
};

/**
 * Hook to fetch a single task by ID
 */
export const useTask = (id: string) => {
    return useQuery({
        queryKey: taskKeys.detail(id),
        queryFn: () => taskApi.getTaskById(id),
        enabled: !!id,
    });
};

/**
 * Hook to fetch multiple tasks by IDs
 */
export const useTasksByIds = (ids: string[]) => {
    return useQuery({
        queryKey: taskKeys.list({ ids }),
        queryFn: () => taskApi.getTasksByIds(ids),
        enabled: ids.length > 0,
    });
};

/**
 * Hook to create a new task
 */
export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (input: CreateTaskInput) => taskApi.createTask(input),
        onSuccess: () => {
            // Invalidate and refetch task list
            queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
        },
    });
};

/**
 * Hook to update an existing task
 */
export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: string; input: UpdateTaskInput }) =>
            taskApi.updateTask(id, input),
        onSuccess: (_data, variables) => {
            // Invalidate and refetch both list and detail
            queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
            queryClient.invalidateQueries({
                queryKey: taskKeys.detail(variables.id),
            });
        },
    });
};

/**
 * Hook to delete a task
 */
export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => taskApi.deleteTask(id),
        onSuccess: () => {
            // Invalidate and refetch task list
            queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
        },
    });
};
