import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
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
    /**
     * Optional custom markdown description (overrides the default description)
     */
    customDescription?: string;
    /**
     * Optional width for the hover card (default: 'w-80')
     */
    hoverCardWidth?: string;
}

/**
 * Section Header Component
 * Displays a section label with an initial circle icon and informational hover card
 */
export function SectionHeader({
    initial,
    label,
    description,
    customDescription,
    hoverCardWidth = 'w-80',
}: SectionHeaderProps) {
    const displayContent = customDescription || description;
    const isMarkdown = Boolean(customDescription);

    return (
        <div className="flex items-center gap-3">
            <HoverCard>
                <HoverCardTrigger asChild>
                    <button
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-primary transition-all hover:scale-110 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-primary"
                        style={{ cursor: 'help' }}
                        aria-label={`Information about ${label}`}
                    >
                        <span className="text-base font-bold">{initial}</span>
                    </button>
                </HoverCardTrigger>
                <HoverCardContent
                    className={`${hoverCardWidth} max-h-96 overflow-y-auto shadow-lg`}
                    side="bottom"
                    align="start"
                    sideOffset={8}
                >
                    <div className="space-y-2">
                        {!isMarkdown && (
                            <h4 className="font-semibold text-foreground">
                                {label}
                            </h4>
                        )}
                        {isMarkdown ? (
                            <div className="markdown-content text-sm text-muted-foreground [&>h1]:text-lg [&>h1]:font-bold [&>h1]:mb-3 [&>h1]:text-foreground [&>h2]:text-base [&>h2]:font-semibold [&>h2]:mb-2 [&>h2]:mt-4 [&>h2]:text-foreground [&>h3]:text-sm [&>h3]:font-semibold [&>h3]:mb-1 [&>h3]:mt-3 [&>h3]:text-foreground [&>p]:mb-3 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:mb-3 [&>ul]:space-y-1 [&>ol]:list-decimal [&>ol]:ml-4 [&>ol]:mb-3 [&>ol]:space-y-1 [&>li]:leading-relaxed [&>strong]:font-semibold [&>strong]:text-foreground [&>em]:italic [&>code]:bg-muted [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-xs [&>code]:font-mono">
                                <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                                    {displayContent}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                {displayContent}
                            </p>
                        )}
                    </div>
                </HoverCardContent>
            </HoverCard>
            <span className="text-lg font-semibold">{label}</span>
        </div>
    );
}
