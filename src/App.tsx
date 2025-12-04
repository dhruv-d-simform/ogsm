import { useEffect } from 'react';
import { seedDatabase } from '@/utils/seedData';
import * as api from '@/api';
import { clearAllStorage } from '@/utils/storage';

/**
 * Extend Window interface for OGSM API
 */
declare global {
    interface Window {
        ogsmApi: typeof api & {
            clearAllStorage: typeof clearAllStorage;
            seedDatabase: typeof seedDatabase;
        };
    }
}

/**
 * Initialize the data layer on app mount
 */
function App() {
    useEffect(() => {
        // Seed the database if it's empty
        seedDatabase();

        // Expose API to browser console for development
        if (typeof window !== 'undefined') {
            window.ogsmApi = {
                ...api,
                clearAllStorage,
                seedDatabase,
            };
            console.log('🎯 OGSM API exposed to console as window.ogsmApi');
            console.log('Available methods:', Object.keys(window.ogsmApi));
            console.log('Example usage: await window.ogsmApi.getAllOGSMs()');
            console.log('Clear all data: window.ogsmApi.clearAllStorage()');
            console.log('Reseed database: window.ogsmApi.seedDatabase()');
        }
    }, []);

    return (
        <div>
            <p>Hello, World</p>
        </div>
    );
}

export default App;
