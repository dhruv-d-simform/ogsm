import { useState, useEffect } from 'react';
import { useReadOnly } from '@/contexts/ReadOnlyContext';
import { SectionHeader } from '@/components/sections/SectionHeader';

interface ObjectiveSectionProps {
    objective: string;
    onObjectiveChange?: (newObjective: string) => void;
}

/**
 * Objective Section Component
 * Displays the main objective at the top of the OGSM board
 * Supports inline editing on click
 */
export function ObjectiveSection({
    objective,
    onObjectiveChange,
}: ObjectiveSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(objective);
    const { isReadOnly } = useReadOnly();

    /**
     * Sync local state when prop changes
     */
    useEffect(() => {
        setLocalValue(objective);
    }, [objective]);

    /**
     * Handle click to enter edit mode
     */
    const handleClick = () => {
        if (isReadOnly) return;
        setIsEditing(true);
    };

    /**
     * Handle blur to save and exit edit mode
     */
    const handleBlur = () => {
        const trimmedValue = localValue.trim();
        if (trimmedValue && trimmedValue !== objective && onObjectiveChange) {
            onObjectiveChange(trimmedValue);
        } else {
            setLocalValue(objective);
        }
        setIsEditing(false);
    };

    /**
     * Handle input change
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    };

    /**
     * Handle key down (Enter to save, Escape to cancel)
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBlur();
        } else if (e.key === 'Escape') {
            setLocalValue(objective);
            setIsEditing(false);
        }
    };

    return (
        <div className="rounded-lg bg-primary p-6 text-primary-foreground">
            <div className="flex items-center gap-3">
                <SectionHeader
                    initial="O"
                    label="Objective"
                    description="The overarching goal or aspiration that defines what you want to achieve. It should be clear, inspiring, and provide direction for all other elements of your OGSM plan."
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={localValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="flex-1 bg-transparent text-lg outline-none"
                    />
                ) : (
                    <p
                        onClick={handleClick}
                        className={`flex-1 truncate text-lg ${
                            isReadOnly ? '' : 'cursor-pointer hover:opacity-80'
                        }`}
                        title={isReadOnly ? localValue : 'Click to edit'}
                    >
                        {localValue}
                    </p>
                )}
            </div>
        </div>
    );
}
