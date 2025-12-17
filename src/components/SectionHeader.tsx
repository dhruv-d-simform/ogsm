import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';

interface SectionHeaderProps {
    /**
     * The letter to display in the circle icon (O, G, S, M)
     */
    initial: string;
    /**
     * The section label (Objective, Goals, Strategy, Measures)
     */
    label: string;
    /**
     * Description explaining what this section represents in the OGSM framework
     */
    description: string;
}

/**
 * Section Header Component
 * Displays a section label with an initial circle icon and informational hover card
 */
export function SectionHeader({
    initial,
    label,
    description,
}: SectionHeaderProps) {
    return (
        <div className="flex items-center gap-3">
            <HoverCard>
                <HoverCardTrigger asChild>
                    <button
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-background text-primary transition-all hover:scale-110 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-primary"
                        aria-label={`Information about ${label}`}
                    >
                        <span className="text-base font-bold">{initial}</span>
                    </button>
                </HoverCardTrigger>
                <HoverCardContent
                    className="w-80"
                    side="bottom"
                    align="start"
                    sideOffset={8}
                >
                    <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">
                            {label}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>
                </HoverCardContent>
            </HoverCard>
            <span className="text-lg font-semibold">{label}</span>
        </div>
    );
}
