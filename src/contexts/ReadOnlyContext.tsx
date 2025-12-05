import { createContext, useContext, useState } from 'react';

interface ReadOnlyContextType {
    isReadOnly: boolean;
    setIsReadOnly: (value: boolean) => void;
}

const ReadOnlyContext = createContext<ReadOnlyContextType | undefined>(
    undefined
);

const READ_ONLY_STORAGE_KEY = 'ogsm-read-only-mode';

/**
 * Get read-only state from localStorage
 */
const getStoredReadOnlyState = (): boolean => {
    try {
        const stored = localStorage.getItem(READ_ONLY_STORAGE_KEY);
        return stored === 'true';
    } catch {
        return false;
    }
};

/**
 * Save read-only state to localStorage
 */
const setStoredReadOnlyState = (value: boolean): void => {
    try {
        localStorage.setItem(READ_ONLY_STORAGE_KEY, String(value));
    } catch {
        // Ignore errors (e.g., localStorage not available)
    }
};

/**
 * Provider for read-only mode state
 * Persists state in localStorage across sessions and navigation
 */
export function ReadOnlyProvider({ children }: { children: React.ReactNode }) {
    const [isReadOnly, setIsReadOnlyState] = useState(getStoredReadOnlyState);

    /**
     * Wrapper to update both state and localStorage
     */
    const setIsReadOnly = (value: boolean) => {
        setIsReadOnlyState(value);
        setStoredReadOnlyState(value);
    };

    return (
        <ReadOnlyContext.Provider value={{ isReadOnly, setIsReadOnly }}>
            {children}
        </ReadOnlyContext.Provider>
    );
}

/**
 * Hook to access read-only mode state
 */
export function useReadOnly() {
    const context = useContext(ReadOnlyContext);
    if (context === undefined) {
        throw new Error('useReadOnly must be used within a ReadOnlyProvider');
    }
    return context;
}
