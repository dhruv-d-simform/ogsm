import { createContext, useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';

interface ReadOnlyContextType {
    isReadOnly: boolean;
    setIsReadOnly: (value: boolean) => void;
}

const ReadOnlyContext = createContext<ReadOnlyContextType | undefined>(
    undefined
);

/**
 * Provider for read-only mode state
 * Resets to false when OGSM ID changes
 */
export function ReadOnlyProvider({ children }: { children: React.ReactNode }) {
    const [isReadOnly, setIsReadOnly] = useState(false);
    const { id } = useParams();

    /**
     * Reset read-only mode when navigating to a different OGSM
     */
    useEffect(() => {
        setIsReadOnly(false);
    }, [id]);

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
