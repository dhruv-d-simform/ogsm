/**
 * Home page - shown when no OGSM is selected
 */
export function HomePage() {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-foreground">
                    Welcome to OGSM
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Select an OGSM plan from the sidebar to get started
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                    or create a new one
                </p>
            </div>
        </div>
    );
}
