import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { OGSM, Goal, Strategy, KPI, Action, Task } from '@/types';

/**
 * Props for OgsmPdfDocument component
 */
interface OgsmPdfDocumentProps {
    ogsm: OGSM;
    goals: Goal[];
    strategies: Strategy[];
    allKpis: KPI[];
    allActions: Action[];
    allTasks: Task[];
}

/**
 * PDF styles following the OGSM board design
 */
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: 30,
        paddingBottom: 15,
        borderBottom: '2 solid #e5e7eb',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 5,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 12,
        paddingBottom: 6,
        borderBottom: '1 solid #e5e7eb',
    },
    objectiveText: {
        fontSize: 13,
        lineHeight: 1.6,
        color: '#374151',
    },
    card: {
        marginBottom: 15,
        padding: 12,
        backgroundColor: '#f9fafb',
        borderRadius: 4,
        border: '1 solid #e5e7eb',
        breakInside: 'avoid',
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 6,
    },
    cardDescription: {
        fontSize: 11,
        color: '#6b7280',
        marginBottom: 8,
        lineHeight: 1.5,
    },
    kpiContainer: {
        marginTop: 8,
        paddingTop: 8,
        borderTop: '1 solid #e5e7eb',
    },
    kpiItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        fontSize: 10,
    },
    kpiName: {
        color: '#374151',
        flex: 1,
    },
    kpiValue: {
        color: '#6b7280',
        marginLeft: 10,
    },
    actionContainer: {
        marginTop: 10,
        paddingLeft: 10,
    },
    actionItem: {
        marginBottom: 8,
        fontSize: 10,
    },
    actionTitle: {
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 3,
    },
    taskList: {
        marginTop: 4,
        paddingLeft: 8,
    },
    taskItem: {
        fontSize: 9,
        color: '#6b7280',
        marginBottom: 2,
        flexDirection: 'row',
    },
    taskStatus: {
        width: 60,
        marginRight: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        fontSize: 9,
        color: '#9ca3af',
        textAlign: 'center',
        borderTop: '1 solid #e5e7eb',
        paddingTop: 10,
    },
});

/**
 * PDF Document component for OGSM export
 * Renders OGSM data as a formatted PDF with selectable text
 */
export function OgsmPdfDocument({
    ogsm,
    goals,
    strategies,
    allKpis,
    allActions,
    allTasks,
}: OgsmPdfDocumentProps) {
    /**
     * Get KPIs by IDs
     */
    const getKpisByIds = (kpiIds: string[]): KPI[] => {
        return kpiIds
            .map((id) => allKpis.find((kpi) => kpi.id === id))
            .filter((kpi): kpi is KPI => kpi !== undefined);
    };

    /**
     * Get Actions by IDs
     */
    const getActionsByIds = (actionIds: string[]): Action[] => {
        return actionIds
            .map((id) => allActions.find((action) => action.id === id))
            .filter((action): action is Action => action !== undefined);
    };

    /**
     * Get Tasks by IDs
     */
    const getTasksByIds = (taskIds: string[]): Task[] => {
        return taskIds
            .map((id) => allTasks.find((task) => task.id === id))
            .filter((task): task is Task => task !== undefined);
    };

    /**
     * Format task status for display
     */
    const formatTaskStatus = (status: string): string => {
        const statusMap: Record<string, string> = {
            pending: 'Pending',
            'in-progress': 'In Progress',
            completed: 'Completed',
        };
        return statusMap[status] || status;
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header with OGSM Name */}
                <View style={styles.header}>
                    <Text style={styles.title}>{ogsm.name}</Text>
                    <Text style={{ fontSize: 10, color: '#6b7280' }}>
                        Generated on{' '}
                        {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </Text>
                </View>

                {/* Objective Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Objective</Text>
                    <Text style={styles.objectiveText}>
                        {ogsm.objective || 'No objective defined'}
                    </Text>
                </View>

                {/* Goals Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Goals ({goals.length})
                    </Text>
                    {goals.length === 0 ? (
                        <Text style={{ fontSize: 11, color: '#9ca3af' }}>
                            No goals defined
                        </Text>
                    ) : (
                        goals.map((goal) => {
                            const kpis = getKpisByIds(goal.kpiIds);
                            return (
                                <View key={goal.id} style={styles.card}>
                                    <Text style={styles.cardTitle}>
                                        {goal.name}
                                    </Text>
                                    {goal.description && (
                                        <Text style={styles.cardDescription}>
                                            {goal.description}
                                        </Text>
                                    )}
                                    {kpis.length > 0 && (
                                        <View style={styles.kpiContainer}>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: 'bold',
                                                    color: '#6b7280',
                                                    marginBottom: 4,
                                                }}
                                            >
                                                Key Performance Indicators:
                                            </Text>
                                            {kpis.map((kpi) => (
                                                <View
                                                    key={kpi.id}
                                                    style={styles.kpiItem}
                                                >
                                                    <Text
                                                        style={styles.kpiName}
                                                    >
                                                        {kpi.name}
                                                    </Text>
                                                    <Text
                                                        style={styles.kpiValue}
                                                    >
                                                        {kpi.current} /{' '}
                                                        {kpi.target}
                                                        {kpi.unit
                                                            ? ` ${kpi.unit}`
                                                            : ''}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            );
                        })
                    )}
                </View>

                {/* Strategies Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Strategies ({strategies.length})
                    </Text>
                    {strategies.length === 0 ? (
                        <Text style={{ fontSize: 11, color: '#9ca3af' }}>
                            No strategies defined
                        </Text>
                    ) : (
                        strategies.map((strategy) => {
                            const dashboardKpis = getKpisByIds(
                                strategy.dashboardKpiIds
                            );
                            const actions = getActionsByIds(strategy.actionIds);
                            return (
                                <View key={strategy.id} style={styles.card}>
                                    <Text style={styles.cardTitle}>
                                        {strategy.name}
                                    </Text>
                                    {strategy.description && (
                                        <Text style={styles.cardDescription}>
                                            {strategy.description}
                                        </Text>
                                    )}
                                    {dashboardKpis.length > 0 && (
                                        <View style={styles.kpiContainer}>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: 'bold',
                                                    color: '#6b7280',
                                                    marginBottom: 4,
                                                }}
                                            >
                                                Dashboard KPIs:
                                            </Text>
                                            {dashboardKpis.map((kpi) => (
                                                <View
                                                    key={kpi.id}
                                                    style={styles.kpiItem}
                                                >
                                                    <Text
                                                        style={styles.kpiName}
                                                    >
                                                        {kpi.name}
                                                    </Text>
                                                    <Text
                                                        style={styles.kpiValue}
                                                    >
                                                        {kpi.current} /{' '}
                                                        {kpi.target}
                                                        {kpi.unit
                                                            ? ` ${kpi.unit}`
                                                            : ''}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                    {actions.length > 0 && (
                                        <View style={styles.actionContainer}>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: 'bold',
                                                    color: '#6b7280',
                                                    marginBottom: 6,
                                                }}
                                            >
                                                Actions:
                                            </Text>
                                            {actions.map((action) => {
                                                const tasks = getTasksByIds(
                                                    action.taskIds
                                                );
                                                return (
                                                    <View
                                                        key={action.id}
                                                        style={
                                                            styles.actionItem
                                                        }
                                                    >
                                                        <Text
                                                            style={
                                                                styles.actionTitle
                                                            }
                                                        >
                                                            • {action.name}
                                                        </Text>
                                                        {action.description && (
                                                            <Text
                                                                style={{
                                                                    fontSize: 9,
                                                                    color: '#6b7280',
                                                                    marginBottom: 3,
                                                                }}
                                                            >
                                                                {
                                                                    action.description
                                                                }
                                                            </Text>
                                                        )}
                                                        {tasks.length > 0 && (
                                                            <View
                                                                style={
                                                                    styles.taskList
                                                                }
                                                            >
                                                                {tasks.map(
                                                                    (task) => (
                                                                        <View
                                                                            key={
                                                                                task.id
                                                                            }
                                                                            style={
                                                                                styles.taskItem
                                                                            }
                                                                        >
                                                                            <Text
                                                                                style={
                                                                                    styles.taskStatus
                                                                                }
                                                                            >
                                                                                {formatTaskStatus(
                                                                                    task.status
                                                                                )}
                                                                            </Text>
                                                                            <Text
                                                                                style={{
                                                                                    flex: 1,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    task.name
                                                                                }
                                                                            </Text>
                                                                        </View>
                                                                    )
                                                                )}
                                                            </View>
                                                        )}
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    )}
                                </View>
                            );
                        })
                    )}
                </View>

                {/* Footer */}
                <View style={styles.footer} fixed>
                    <Text>
                        {ogsm.name} - OGSM Plan - Page{' '}
                        <Text
                            render={({ pageNumber, totalPages }) =>
                                `${pageNumber} / ${totalPages}`
                            }
                        />
                    </Text>
                </View>
            </Page>
        </Document>
    );
}
