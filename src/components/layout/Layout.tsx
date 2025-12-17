import { Outlet } from 'react-router';
import { Sidebar } from '@/components/layout/Sidebar';

/**
 * Main application layout with sidebar and content area
 */
export function Layout() {
    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Skip to main content link for keyboard users */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
                Skip to main content
            </a>

            {/* Left Sidebar - Fixed width */}
            <Sidebar />

            {/* Main Content Area */}
            <main
                id="main-content"
                className="flex-1 overflow-auto bg-background"
            >
                <Outlet />
            </main>
        </div>
    );
}
