import { useState } from 'react';
import { OgsmHeader } from '@/components/OgsmHeader';
import { OgsmBoard } from '@/components/OgsmBoard';
import type { OGSM } from '@/types';

/**
 * Mock OGSM data embedded in component
 * This is the same data from seedData.ts for reference
 */
const MOCK_OGSM: OGSM = {
    id: 'mock-ogsm-1',
    name: 'React Developer 5-Year Career Plan',
    objective:
        'Transform from a junior React developer into a recognized technical leader and industry influencer within 5 years, with deep expertise in React ecosystem, proven leadership capabilities, and a strong professional network.',
    goalIds: [],
    strategyIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

/**
 * OGSM detail page - displays the main area with header and board
 */
export function OgsmDetailPage() {
    const [ogsm, setOgsm] = useState<OGSM>(MOCK_OGSM);

    /**
     * Handle OGSM name change
     */
    const handleNameChange = (newName: string) => {
        setOgsm({ ...ogsm, name: newName });
    };

    return (
        <div className="flex h-full flex-col">
            <OgsmHeader name={ogsm.name} onNameChange={handleNameChange} />
            <OgsmBoard ogsm={ogsm} />
        </div>
    );
}
