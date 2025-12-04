import { useState } from 'react';

interface ObjectiveSectionProps {
    objective: string;
}

/**
 * Objective Section Component
 * Displays the main objective at the top of the OGSM board
 * Supports inline editing on click
 */
export function ObjectiveSection({ objective }: ObjectiveSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(objective);

    /**
     * Handle click to enter edit mode
     */
    const handleClick = () => {
        setIsEditing(true);
    };

    /**
     * Handle blur to exit edit mode
     */
    const handleBlur = () => {
        setIsEditing(false);
    };

    /**
     * Handle input change
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    };

    return (
        <div className="rounded-lg bg-blue-900 p-6 text-white">
            <div className="flex items-center gap-3">
                <span className="text-lg font-semibold">Objective</span>
                {isEditing ? (
                    <input
                        type="text"
                        value={localValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                        className="flex-1 bg-transparent text-lg outline-none"
                    />
                ) : (
                    <p
                        onClick={handleClick}
                        className="flex-1 cursor-pointer truncate text-lg"
                    >
                        {localValue}
                    </p>
                )}
            </div>
        </div>
    );
}
