# OGSM Data Layer API Documentation

This document describes the complete data layer implementation for the OGSM application.

## Overview

The data layer provides a complete CRUD API for all OGSM entities with localStorage persistence. All API functions are async and simulate real API calls with a small delay.

## Architecture

### Data Storage

- All data is stored in **localStorage** with versioned keys
- Each entity type is stored separately (normalized structure)
- References between entities use IDs, not embedded objects
- Version numbers in keys enable future database migrations

### Storage Keys (with versions)

```typescript
{
  OGSM: 'ogsm_v1',
  GOALS: 'goals_v1',
  KPIS: 'kpis_v1',
  STRATEGIES: 'strategies_v1',
  ACTIONS: 'actions_v1',
  TASKS: 'tasks_v1',
}
```

## Data Model

### Entity Relationships

```
OGSM
├── goalIds → Goal[]
│   └── kpiIds → KPI[]
└── strategyIds → Strategy[]
    ├── dashboardKpiIds → KPI[]
    └── actionIds → Action[]
        └── taskIds → Task[]
```

### Entity Types

#### OGSM

- `id`: string (unique identifier)
- `name`: string
- `objective`: string
- `goalIds`: string[] (references to Goal objects)
- `strategyIds`: string[] (references to Strategy objects)
- `createdAt`: string (ISO timestamp)
- `updatedAt`: string (ISO timestamp)

#### Goal

- `id`: string
- `name`: string
- `description?`: string
- `kpiIds`: string[] (references to KPI objects)
- `createdAt`: string
- `updatedAt`: string

#### KPI (Key Performance Indicator)

- `id`: string
- `name`: string
- `target`: number
- `current`: number
- `unit?`: string (e.g., "%", "count", "hours")
- `createdAt`: string
- `updatedAt`: string

#### Strategy

- `id`: string
- `name`: string
- `description?`: string
- `dashboardKpiIds`: string[] (references to KPI objects)
- `actionIds`: string[] (references to Action objects)
- `createdAt`: string
- `updatedAt`: string

#### Action

- `id`: string
- `name`: string
- `description?`: string
- `taskIds`: string[] (references to Task objects)
- `createdAt`: string
- `updatedAt`: string

#### Task

- `id`: string
- `name`: string
- `status`: 'pending' | 'in-progress' | 'completed'
- `createdAt`: string
- `updatedAt`: string

## API Functions

All APIs are available in the browser console via `window.ogsmApi`.

### OGSM APIs

```typescript
// Get all OGSMs
await window.ogsmApi.getAllOGSMs(): Promise<OGSM[]>

// Get OGSM by ID
await window.ogsmApi.getOGSMById(id: string): Promise<OGSM | null>

// Create new OGSM
await window.ogsmApi.createOGSM(input: CreateOGSMInput): Promise<OGSM>

// Update OGSM
await window.ogsmApi.updateOGSM(id: string, input: UpdateOGSMInput): Promise<OGSM | null>

// Delete OGSM
await window.ogsmApi.deleteOGSM(id: string): Promise<boolean>

// Get OGSM with all nested data populated
await window.ogsmApi.getOGSMWithDetails(id: string): Promise<OGSMWithDetails | null>
```

### Goal APIs

```typescript
// Get all goals
await window.ogsmApi.getAllGoals(): Promise<Goal[]>

// Get goal by ID
await window.ogsmApi.getGoalById(id: string): Promise<Goal | null>

// Get goal with KPIs populated
await window.ogsmApi.getGoalWithDetails(id: string): Promise<GoalWithDetails | null>

// Get multiple goals by IDs
await window.ogsmApi.getGoalsByIds(ids: string[]): Promise<Goal[]>

// Get multiple goals with details
await window.ogsmApi.getGoalsWithDetails(ids: string[]): Promise<GoalWithDetails[]>

// Create new goal
await window.ogsmApi.createGoal(input: CreateGoalInput): Promise<Goal>

// Update goal
await window.ogsmApi.updateGoal(id: string, input: UpdateGoalInput): Promise<Goal | null>

// Delete goal
await window.ogsmApi.deleteGoal(id: string): Promise<boolean>
```

### KPI APIs

```typescript
// Get all KPIs
await window.ogsmApi.getAllKPIs(): Promise<KPI[]>

// Get KPI by ID
await window.ogsmApi.getKPIById(id: string): Promise<KPI | null>

// Get multiple KPIs by IDs
await window.ogsmApi.getKPIsByIds(ids: string[]): Promise<KPI[]>

// Create new KPI
await window.ogsmApi.createKPI(input: CreateKPIInput): Promise<KPI>

// Update KPI
await window.ogsmApi.updateKPI(id: string, input: UpdateKPIInput): Promise<KPI | null>

// Delete KPI
await window.ogsmApi.deleteKPI(id: string): Promise<boolean>
```

### Strategy APIs

```typescript
// Get all strategies
await window.ogsmApi.getAllStrategies(): Promise<Strategy[]>

// Get strategy by ID
await window.ogsmApi.getStrategyById(id: string): Promise<Strategy | null>

// Get strategy with KPIs and actions populated
await window.ogsmApi.getStrategyWithDetails(id: string): Promise<StrategyWithDetails | null>

// Get multiple strategies by IDs
await window.ogsmApi.getStrategiesByIds(ids: string[]): Promise<Strategy[]>

// Get multiple strategies with details
await window.ogsmApi.getStrategiesWithDetails(ids: string[]): Promise<StrategyWithDetails[]>

// Create new strategy
await window.ogsmApi.createStrategy(input: CreateStrategyInput): Promise<Strategy>

// Update strategy
await window.ogsmApi.updateStrategy(id: string, input: UpdateStrategyInput): Promise<Strategy | null>

// Delete strategy
await window.ogsmApi.deleteStrategy(id: string): Promise<boolean>
```

### Action APIs

```typescript
// Get all actions
await window.ogsmApi.getAllActions(): Promise<Action[]>

// Get action by ID
await window.ogsmApi.getActionById(id: string): Promise<Action | null>

// Get action with tasks populated
await window.ogsmApi.getActionWithDetails(id: string): Promise<ActionWithDetails | null>

// Get multiple actions by IDs
await window.ogsmApi.getActionsByIds(ids: string[]): Promise<Action[]>

// Get multiple actions with details
await window.ogsmApi.getActionsWithDetails(ids: string[]): Promise<ActionWithDetails[]>

// Create new action
await window.ogsmApi.createAction(input: CreateActionInput): Promise<Action>

// Update action
await window.ogsmApi.updateAction(id: string, input: UpdateActionInput): Promise<Action | null>

// Delete action
await window.ogsmApi.deleteAction(id: string): Promise<boolean>
```

### Task APIs

```typescript
// Get all tasks
await window.ogsmApi.getAllTasks(): Promise<Task[]>

// Get task by ID
await window.ogsmApi.getTaskById(id: string): Promise<Task | null>

// Get multiple tasks by IDs
await window.ogsmApi.getTasksByIds(ids: string[]): Promise<Task[]>

// Create new task
await window.ogsmApi.createTask(input: CreateTaskInput): Promise<Task>

// Update task
await window.ogsmApi.updateTask(id: string, input: UpdateTaskInput): Promise<Task | null>

// Delete task
await window.ogsmApi.deleteTask(id: string): Promise<boolean>
```

### Utility Functions

```typescript
// Clear all data from localStorage
window.ogsmApi.clearAllStorage(): void

// Reseed database with initial data
window.ogsmApi.seedDatabase(): void
```

## Usage Examples

### Browser Console Examples

```javascript
// Get all OGSMs
const ogsms = await window.ogsmApi.getAllOGSMs();
console.log(ogsms);

// Get first OGSM with all nested details
const ogsmWithDetails = await window.ogsmApi.getOGSMWithDetails(ogsms[0].id);
console.log(ogsmWithDetails);

// Create a new task
const newTask = await window.ogsmApi.createTask({
    name: 'Learn React 19',
    status: 'pending',
});
console.log(newTask);

// Update task status
const updatedTask = await window.ogsmApi.updateTask(newTask.id, {
    status: 'in-progress',
});
console.log(updatedTask);

// Create a new KPI
const newKPI = await window.ogsmApi.createKPI({
    name: 'Pull Requests Merged',
    target: 50,
    current: 15,
    unit: 'count',
});

// Create a new goal
const newGoal = await window.ogsmApi.createGoal({
    name: 'Master React Server Components',
    description: 'Deep dive into RSC patterns',
    kpiIds: [newKPI.id],
});

// Update an OGSM to add the new goal
const ogsm = ogsms[0];
await window.ogsmApi.updateOGSM(ogsm.id, {
    goalIds: [...ogsm.goalIds, newGoal.id],
});

// Clear all data and reseed
window.ogsmApi.clearAllStorage();
window.ogsmApi.seedDatabase();
```

### React Component Example

```typescript
import { useEffect, useState } from 'react';
import { getAllOGSMs, type OGSM } from '@/api';

function OGSMList() {
  const [ogsms, setOgsms] = useState<OGSM[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOGSMs = async () => {
      try {
        const data = await getAllOGSMs();
        setOgsms(data);
      } catch (error) {
        console.error('Failed to fetch OGSMs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOGSMs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {ogsms.map(ogsm => (
        <div key={ogsm.id}>{ogsm.name}</div>
      ))}
    </div>
  );
}
```

## Seed Data

The application comes with pre-seeded data: a comprehensive 5-year career growth plan for a React developer. This includes:

- 1 OGSM plan
- 4 Goals (one per career stage)
- 5 Strategies (learning, practices, leadership, networking, expansion)
- 10 Actions (specific initiatives)
- 40 Tasks (concrete steps)
- 15 KPIs (progress metrics)

The seed data is automatically loaded on first app launch if localStorage is empty.

## Error Handling

All API functions use the `tryCatch` utility wrapper:

- Errors are caught and re-thrown with descriptive messages
- Network simulation with 100ms delay
- Type-safe error handling

## Future Enhancements

Potential improvements:

- Add validation using Zod schemas
- Implement optimistic updates
- Add undo/redo functionality
- Support for data export/import (JSON)
- Add search and filtering capabilities
- Implement caching layer
- Add data migration utilities for version upgrades

## File Structure

```
src/
├── api/
│   ├── index.ts          # Main export for all APIs
│   ├── ogsm.ts           # OGSM CRUD operations
│   ├── goals.ts          # Goal CRUD operations
│   ├── kpis.ts           # KPI CRUD operations
│   ├── strategies.ts     # Strategy CRUD operations
│   ├── actions.ts        # Action CRUD operations
│   ├── tasks.ts          # Task CRUD operations
│   └── helpers.ts        # Helper functions (e.g., getOGSMWithDetails)
├── types/
│   └── index.ts          # All TypeScript type definitions
└── utils/
    ├── storage.ts        # localStorage utilities and keys
    ├── seedData.ts       # Initial seed data
    └── tryCatch.ts       # Error handling wrapper
```
