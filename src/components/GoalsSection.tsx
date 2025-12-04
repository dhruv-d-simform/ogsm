/**
 * Goals Section Component
 * Displays the goals list on the left side of the board
 */
export function GoalsSection() {
    return (
        <div className="flex h-full flex-col rounded-lg border border-gray-300">
            {/* Header */}
            <div className="rounded-t-lg bg-blue-900 p-4 text-white">
                <h2 className="text-lg font-semibold">Goals</h2>
            </div>

            {/* Content Area - Empty for now */}
            <div className="flex-1 p-4">
                {/* Goals content will be added here */}
            </div>
        </div>
    );
}
