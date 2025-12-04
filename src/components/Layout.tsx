import { Outlet } from 'react-router';
import { Sidebar } from '@/components/Sidebar';

/**
 * Main application layout with sidebar and content area
 */
export function Layout() {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Left Sidebar - Fixed width */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto bg-background">
                <Outlet />
            </main>
        </div>
    );
}
