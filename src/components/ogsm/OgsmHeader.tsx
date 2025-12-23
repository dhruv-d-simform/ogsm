import { useState, useRef, useEffect } from 'react';
import { Printer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useReadOnly } from '@/contexts/ReadOnlyContext';
import { usePdfExport } from '@/hooks/usePdfExport';
import { OgsmPdfDocument } from './OgsmPdfDocument';
import type { OGSM } from '@/types';

interface OgsmHeaderProps {
    name: string;
    onNameChange: (newName: string) => void;
    ogsm: OGSM;
}

/**
 * Header component for OGSM board
 * Displays and allows inline editing of OGSM name
 * Includes read-only mode toggle and PDF export
 */
export function OgsmHeader({ name, onNameChange, ogsm }: OgsmHeaderProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [nameValue, setNameValue] = useState(name);
    const inputRef = useRef<HTMLInputElement>(null);
    const { isReadOnly, setIsReadOnly } = useReadOnly();

    // PDF export hook
    const {
        goals,
        strategies,
        kpis,
        actions,
        tasks,
        isLoading: isPdfLoading,
        exportPdf,
    } = usePdfExport(ogsm);

    /**
     * Handle PDF export
     */
    const handleExportPdf = async () => {
        const pdfDocument = (
            <OgsmPdfDocument
                ogsm={ogsm}
                goals={goals}
                strategies={strategies}
                allKpis={kpis}
                allActions={actions}
                allTasks={tasks}
            />
        );
        await exportPdf(pdfDocument);
    };

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
        // Prevent editing in read-only mode
        if (isReadOnly) return;
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
            <div className="flex items-center justify-between">
                <div className="flex-1">
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
                            className={`h-9 text-2xl font-bold leading-9 text-foreground ${
                                isReadOnly
                                    ? ''
                                    : 'cursor-pointer hover:text-primary'
                            }`}
                            onClick={handleNameClick}
                            title={isReadOnly ? '' : 'Click to edit'}
                        >
                            {name}
                        </h1>
                    )}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                    {/* Print to PDF Button */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExportPdf}
                        disabled={isPdfLoading}
                        aria-label="Export OGSM board to PDF"
                    >
                        <Printer className="h-4 w-4" />
                        {isPdfLoading ? 'Loading...' : 'Print to PDF'}
                    </Button>

                    {/* Read-Only Mode Toggle */}
                    <div className="flex items-center gap-3">
                        <Label
                            htmlFor="read-only-mode"
                            className="cursor-pointer text-sm font-medium"
                        >
                            Read-Only Mode
                        </Label>
                        <Switch
                            id="read-only-mode"
                            checked={isReadOnly}
                            onCheckedChange={setIsReadOnly}
                            aria-label="Toggle read-only mode"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
