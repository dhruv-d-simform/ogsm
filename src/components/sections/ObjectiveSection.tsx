import { useState, useEffect } from 'react';
import { Maximize, Minimize } from 'lucide-react';
import { useReadOnly } from '@/contexts/ReadOnlyContext';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { Button } from '@/components/ui/button';

interface ObjectiveSectionProps {
    objective: string;
    onObjectiveChange?: (newObjective: string) => void;
    isFullscreen: boolean;
    onToggleFullscreen: () => void;
}

/**
 * Objective Section Component
 * Displays the main objective at the top of the OGSM board
 * Supports inline editing on click
 */
export function ObjectiveSection({
    objective,
    onObjectiveChange,
    isFullscreen,
    onToggleFullscreen,
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
        <div className="group relative rounded-lg bg-primary p-6 text-primary-foreground">
            <div className="flex items-center gap-3 transition-[padding] duration-200 group-hover:pr-12 group-focus-within:pr-12">
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

            {/* Fullscreen Toggle Button - Visible on hover or focus */}
            <Button
                variant="ghost"
                size="icon"
                onClick={onToggleFullscreen}
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-all duration-200 hover:scale-110 group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100"
                title={
                    isFullscreen
                        ? 'Exit fullscreen mode'
                        : 'Enter fullscreen mode'
                }
            >
                {isFullscreen ? (
                    <Minimize className="h-5 w-5" />
                ) : (
                    <Maximize className="h-5 w-5" />
                )}
            </Button>
        </div>
    );
}
