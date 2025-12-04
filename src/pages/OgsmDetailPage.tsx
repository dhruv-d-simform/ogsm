import { useState } from 'react';
import { Input } from '@/components/ui/input';
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
    const [isEditingName, setIsEditingName] = useState(false);
    const [nameValue, setNameValue] = useState(ogsm.name);

    /**
     * Handle name edit start
     */
    const handleNameClick = () => {
        setIsEditingName(true);
        setNameValue(ogsm.name);
    };

    /**
     * Handle name save
     */
    const handleNameSave = () => {
        setOgsm({ ...ogsm, name: nameValue });
        setIsEditingName(false);
    };

    /**
     * Handle name blur
     */
    const handleNameBlur = () => {
        handleNameSave();
    };

    /**
     * Handle name key press (Enter to save)
     */
    const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleNameSave();
        } else if (e.key === 'Escape') {
            setNameValue(ogsm.name);
            setIsEditingName(false);
        }
    };

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <header className="border-b bg-background px-8 py-6">
                {isEditingName ? (
                    <Input
                        type="text"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        onBlur={handleNameBlur}
                        onKeyDown={handleNameKeyDown}
                        className="text-2xl font-bold"
                        autoFocus
                    />
                ) : (
                    <h1
                        className="cursor-pointer text-2xl font-bold text-foreground hover:text-primary"
                        onClick={handleNameClick}
                    >
                        {ogsm.name}
                    </h1>
                )}
            </header>

            {/* Main Board - Empty Placeholder */}
            <main className="flex-1 overflow-auto bg-muted/20 p-8">
                <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">
                        Main board content will be implemented here
                    </p>
                </div>
            </main>
        </div>
    );
}
