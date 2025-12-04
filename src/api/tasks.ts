/**
 * Task CRUD operations
 */

import type { Task, CreateTaskInput, UpdateTaskInput } from '@/types';
import {
    STORAGE_KEYS,
    readFromStorage,
    writeToStorage,
    generateId,
    getCurrentTimestamp,
    simulateApiDelay,
} from '@/utils/storage';
import { tryCatch } from '@/utils/tryCatch';

/**
 * Get all tasks
 */
export const getAllTasks = async (): Promise<Task[]> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            return readFromStorage<Task>(STORAGE_KEYS.TASKS);
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch tasks: ${error.message}`);
    }

    return result;
};

/**
 * Get task by ID
 */
export const getTaskById = async (id: string): Promise<Task | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            const tasks = readFromStorage<Task>(STORAGE_KEYS.TASKS);
            return tasks.find((task) => task.id === id) || null;
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch task: ${error.message}`);
    }

    return result;
};

/**
 * Get multiple tasks by IDs
 */
export const getTasksByIds = async (ids: string[]): Promise<Task[]> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();
            const tasks = readFromStorage<Task>(STORAGE_KEYS.TASKS);
            return tasks.filter((task) => ids.includes(task.id));
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch tasks: ${error.message}`);
    }

    return result;
};

/**
 * Create a new task
 */
export const createTask = async (input: CreateTaskInput): Promise<Task> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const now = getCurrentTimestamp();
            const newTask: Task = {
                ...input,
                id: generateId(),
                createdAt: now,
                updatedAt: now,
            };

            const tasks = readFromStorage<Task>(STORAGE_KEYS.TASKS);
            tasks.push(newTask);
            writeToStorage(STORAGE_KEYS.TASKS, tasks);

            return newTask;
        })()
    );

    if (error) {
        throw new Error(`Failed to create task: ${error.message}`);
    }

    return result;
};

/**
 * Update an existing task
 */
export const updateTask = async (
    id: string,
    input: UpdateTaskInput
): Promise<Task | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const tasks = readFromStorage<Task>(STORAGE_KEYS.TASKS);
            const index = tasks.findIndex((task) => task.id === id);

            if (index === -1) {
                return null;
            }

            const updatedTask: Task = {
                ...tasks[index],
                ...input,
                updatedAt: getCurrentTimestamp(),
            };

            tasks[index] = updatedTask;
            writeToStorage(STORAGE_KEYS.TASKS, tasks);

            return updatedTask;
        })()
    );

    if (error) {
        throw new Error(`Failed to update task: ${error.message}`);
    }

    return result;
};

/**
 * Delete a task
 */
export const deleteTask = async (id: string): Promise<boolean> => {
    const [result, error] = await tryCatch(
        (async () => {
            await simulateApiDelay();

            const tasks = readFromStorage<Task>(STORAGE_KEYS.TASKS);
            const filteredTasks = tasks.filter((task) => task.id !== id);

            if (filteredTasks.length === tasks.length) {
                return false; // Task not found
            }

            writeToStorage(STORAGE_KEYS.TASKS, filteredTasks);
            return true;
        })()
    );

    if (error) {
        throw new Error(`Failed to delete task: ${error.message}`);
    }

    return result;
};
