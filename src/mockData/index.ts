/**
 * Central module for all mock OGSM data
 * Imports and combines all individual OGSM datasets
 */

import type { OGSM, Goal, KPI, Strategy, Action, Task } from '@/types';
import { createCoffeeShopExpansionData } from './coffee-shop-expansion';
import { createFitnessTransformationData } from './fitness-transformation';
import { createMobileAppLaunchData } from './mobile-app-launch';
import { createYoutubeChannelGrowthData } from './youtube-channel-growth';
import { createLearningSpanishData } from './learning-spanish';
import { createFreelanceDesignBusinessData } from './freelance-design-business';
import { createHomeRenovationData } from './home-renovation';
import { createBookWritingData } from './book-writing';
import { createMarathonTrainingData } from './marathon-training';
import { createRestaurantOpeningData } from './restaurant-opening';
import { createEcommerceStoreData } from './ecommerce-store';
import { createPhotographyBusinessData } from './photography-business';
import { createPodcastLaunchData } from './podcast-launch';
import { createOnlineCourseData } from './online-course';

export interface MockDataset {
    ogsm: OGSM;
    goals: Goal[];
    strategies: Strategy[];
    actions: Action[];
    tasks: Task[];
    kpis: KPI[];
}

export interface CombinedMockData {
    ogsms: OGSM[];
    goals: Goal[];
    strategies: Strategy[];
    actions: Action[];
    tasks: Task[];
    kpis: KPI[];
}

/**
 * Get all mock OGSM datasets combined into a single dataset
 */
export const getAllMockData = (
    generateId: () => string,
    getCurrentTimestamp: () => string
): CombinedMockData => {
    const datasets: MockDataset[] = [
        createCoffeeShopExpansionData(generateId, getCurrentTimestamp),
        createFitnessTransformationData(generateId, getCurrentTimestamp),
        createMobileAppLaunchData(generateId, getCurrentTimestamp),
        createYoutubeChannelGrowthData(generateId, getCurrentTimestamp),
        createLearningSpanishData(generateId, getCurrentTimestamp),
        createFreelanceDesignBusinessData(generateId, getCurrentTimestamp),
        createHomeRenovationData(generateId, getCurrentTimestamp),
        createBookWritingData(generateId, getCurrentTimestamp),
        createMarathonTrainingData(generateId, getCurrentTimestamp),
        createRestaurantOpeningData(generateId, getCurrentTimestamp),
        createEcommerceStoreData(generateId, getCurrentTimestamp),
        createPhotographyBusinessData(generateId, getCurrentTimestamp),
        createPodcastLaunchData(generateId, getCurrentTimestamp),
        createOnlineCourseData(generateId, getCurrentTimestamp),
    ];

    // Combine all datasets
    const combined: CombinedMockData = {
        ogsms: [],
        goals: [],
        strategies: [],
        actions: [],
        tasks: [],
        kpis: [],
    };

    datasets.forEach((dataset) => {
        combined.ogsms.push(dataset.ogsm);
        combined.goals.push(...dataset.goals);
        combined.strategies.push(...dataset.strategies);
        combined.actions.push(...dataset.actions);
        combined.tasks.push(...dataset.tasks);
        combined.kpis.push(...dataset.kpis);
    });

    return combined;
};
