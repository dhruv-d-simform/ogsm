import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Plus } from 'lucide-react';
import type { OGSM } from '@/types';

/**
 * Mock OGSM data for the sidebar
 * This will be replaced by real API calls later
 */
const MOCK_OGSM_DATA: OGSM[] = [
    {
        id: '1',
        name: 'Q1 2024 Revenue Growth',
        objective: 'Increase quarterly revenue by 25% through market expansion',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
    },
    {
        id: '2',
        name: 'Customer Retention Initiative',
        objective: 'Improve customer retention rate to 95% by end of Q2',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-01-20T14:30:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
    },
    {
        id: '3',
        name: 'Product Launch 2024',
        objective:
            'Successfully launch 3 new product features with 80% adoption',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-02-01T09:15:00Z',
        updatedAt: '2024-02-01T09:15:00Z',
    },
    {
        id: '4',
        name: 'Team Expansion Plan',
        objective: 'Grow engineering team by 40% while maintaining quality',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-02-05T11:00:00Z',
        updatedAt: '2024-02-05T11:00:00Z',
    },
    {
        id: '5',
        name: 'Cost Optimization Strategy',
        objective: 'Reduce operational costs by 15% without impacting quality',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-02-10T16:45:00Z',
        updatedAt: '2024-02-10T16:45:00Z',
    },
    {
        id: '6',
        name: 'Customer Support Excellence',
        objective: 'Achieve 98% customer satisfaction score in support',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-02-15T13:20:00Z',
        updatedAt: '2024-02-15T13:20:00Z',
    },
    {
        id: '7',
        name: 'Digital Transformation',
        objective: 'Complete digital transformation of core business processes',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-02-20T10:30:00Z',
        updatedAt: '2024-02-20T10:30:00Z',
    },
    {
        id: '8',
        name: 'Market Share Growth',
        objective: 'Increase market share from 12% to 18% by year end',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-03-01T08:00:00Z',
        updatedAt: '2024-03-01T08:00:00Z',
    },
    {
        id: '9',
        name: 'Employee Engagement Plan',
        objective: 'Boost employee engagement score to 85% or higher',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-03-05T15:10:00Z',
        updatedAt: '2024-03-05T15:10:00Z',
    },
    {
        id: '10',
        name: 'Quality Assurance Improvement',
        objective: 'Reduce bug count by 50% through enhanced QA processes',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-03-10T12:00:00Z',
        updatedAt: '2024-03-10T12:00:00Z',
    },
    {
        id: '11',
        name: 'Sales Pipeline Optimization',
        objective: 'Increase sales pipeline velocity by 30% in Q2',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-03-15T09:45:00Z',
        updatedAt: '2024-03-15T09:45:00Z',
    },
    {
        id: '12',
        name: 'Innovation Sprint 2024',
        objective: 'Launch 5 innovative experiments with measurable impact',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-03-20T14:00:00Z',
        updatedAt: '2024-03-20T14:00:00Z',
    },
    {
        id: '13',
        name: 'Partnership Development',
        objective: 'Establish 10 strategic partnerships to expand reach',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-03-25T11:30:00Z',
        updatedAt: '2024-03-25T11:30:00Z',
    },
    {
        id: '14',
        name: 'Brand Awareness Campaign',
        objective: 'Increase brand recognition by 40% in target markets',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-04-01T10:15:00Z',
        updatedAt: '2024-04-01T10:15:00Z',
    },
    {
        id: '15',
        name: 'Sustainability Initiative',
        objective: 'Reduce carbon footprint by 25% through green practices',
        goalIds: [],
        strategyIds: [],
        createdAt: '2024-04-05T13:45:00Z',
        updatedAt: '2024-04-05T13:45:00Z',
    },
];

/**
 * Sidebar component with search, OGSM list, and create button
 */
export function Sidebar() {
    const [searchQuery, setSearchQuery] = useState('');
    const { id: selectedOgsmId } = useParams();

    // Filter OGSM list based on search query
    const filteredOgsmList = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return MOCK_OGSM_DATA;

        return MOCK_OGSM_DATA.filter(
            (ogsm) =>
                ogsm.name.toLowerCase().includes(query) ||
                ogsm.objective.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    return (
        <aside className="flex h-full w-80 flex-col border-r border-border bg-card">
            {/* Fixed Header - App Title */}
            <div className="border-b border-border px-6 py-4">
                <h1 className="text-2xl font-bold text-foreground">OGSM</h1>
            </div>

            {/* Fixed Search Bar */}
            <div className="border-b border-border px-4 py-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search OGSM plans..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchQuery(e.target.value)
                        }
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Scrollable OGSM List */}
            <ScrollArea className="flex-1">
                <div className="space-y-1 p-2">
                    {filteredOgsmList.length === 0 ? (
                        <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                            No OGSM plans found
                        </div>
                    ) : (
                        filteredOgsmList.map((ogsm) => {
                            const isSelected = selectedOgsmId === ogsm.id;
                            return (
                                <Link
                                    key={ogsm.id}
                                    to={`/ogsm/${ogsm.id}`}
                                    className={`block rounded-lg px-4 py-3 transition-colors ${
                                        isSelected
                                            ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                                    }`}
                                >
                                    <div className="font-medium">
                                        {ogsm.name}
                                    </div>
                                    <div
                                        className={`mt-1 line-clamp-2 text-sm ${
                                            isSelected
                                                ? 'text-blue-700 dark:text-blue-200'
                                                : 'text-muted-foreground'
                                        }`}
                                    >
                                        {ogsm.objective}
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            </ScrollArea>

            {/* Fixed Bottom - Create Button */}
            <div className="border-t border-border p-4">
                <Button className="w-full" size="lg">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New OGSM
                </Button>
            </div>
        </aside>
    );
}
