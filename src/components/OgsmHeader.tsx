import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface OgsmHeaderProps {
    name: string;
    onNameChange: (newName: string) => void;
}

/**
 * Header component for OGSM board
 * Displays and allows inline editing of OGSM name
 */
export function OgsmHeader({ name, onNameChange }: OgsmHeaderProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [nameValue, setNameValue] = useState(name);
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Sync local state when prop changes
     */
    useEffect(() => {
        setNameValue(name);
    }, [name]);

    /**
     * Handle name edit start
     */
    const handleNameClick = () => {
        setIsEditing(true);
        setNameValue(name);
    };

    /**
     * Handle name save
     */
    const handleNameSave = () => {
        const trimmedName = nameValue.trim();
        if (trimmedName && trimmedName !== name) {
            onNameChange(trimmedName);
        } else {
            setNameValue(name);
        }
        setIsEditing(false);
    };

    /**
     * Handle name blur
     */
    const handleNameBlur = () => {
        handleNameSave();
    };

    /**
     * Handle name key press (Enter to save, Escape to cancel)
     */
    const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleNameSave();
        } else if (e.key === 'Escape') {
            setNameValue(name);
            setIsEditing(false);
        }
    };

    return (
        <header className="border-b bg-background px-8 py-6">
            <div className="relative">
                {isEditing ? (
                    <Input
                        ref={inputRef}
                        type="text"
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                        onBlur={handleNameBlur}
                        onKeyDown={handleNameKeyDown}
                        className="h-9 text-2xl font-bold"
                        autoFocus
                    />
                ) : (
                    <h1
                        className="h-9 cursor-pointer text-2xl font-bold leading-9 text-foreground hover:text-primary"
                        onClick={handleNameClick}
                        title="Click to edit"
                    >
                        {name}
                    </h1>
                )}
            </div>
        </header>
    );
}
