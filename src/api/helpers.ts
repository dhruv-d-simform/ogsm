/**
 * Helper API for fetching OGSM with fully populated nested data
 */

import type { OGSMWithDetails } from '@/types';
import { getOGSMById } from './ogsm';
import { getGoalsWithDetails } from './goals';
import { getStrategiesWithDetails } from './strategies';
import { tryCatch } from '@/utils/tryCatch';

/**
 * Get OGSM with all nested details populated
 */
export const getOGSMWithDetails = async (
    id: string
): Promise<OGSMWithDetails | null> => {
    const [result, error] = await tryCatch(
        (async () => {
            const ogsm = await getOGSMById(id);
            if (!ogsm) return null;

            const goals = await getGoalsWithDetails(ogsm.goalIds);
            const strategies = await getStrategiesWithDetails(ogsm.strategyIds);

            return {
                ...ogsm,
                goals,
                strategies,
            } as OGSMWithDetails;
        })()
    );

    if (error) {
        throw new Error(`Failed to fetch OGSM with details: ${error.message}`);
    }

    return result;
};
