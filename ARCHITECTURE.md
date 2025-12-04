# OGSM Data Layer Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser Console                          │
│                      window.ogsmApi.xxx()                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     React Application                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                        App.tsx                            │  │
│  │  • Initializes seed data on mount                        │  │
│  │  • Exposes window.ogsmApi for console access             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                             │                                    │
│                             ▼                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    src/api/index.ts                       │  │
│  │              (Main entry point for all APIs)              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                             │                                    │
│         ┌───────────────────┼───────────────────┐               │
│         ▼                   ▼                   ▼               │
│  ┌──────────┐        ┌──────────┐       ┌──────────┐          │
│  │  OGSM    │        │  Goals   │       │   KPIs   │          │
│  │  API     │        │   API    │       │   API    │          │
│  └──────────┘        └──────────┘       └──────────┘          │
│         ▼                   ▼                   ▼               │
│  ┌──────────┐        ┌──────────┐       ┌──────────┐          │
│  │Strategies│        │ Actions  │       │  Tasks   │          │
│  │  API     │        │   API    │       │   API    │          │
│  └──────────┘        └──────────┘       └──────────┘          │
│                             │                                    │
│                             ▼                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 src/utils/storage.ts                      │  │
│  │  • readFromStorage()                                      │  │
│  │  • writeToStorage()                                       │  │
│  │  • generateId()                                           │  │
│  │  • simulateApiDelay()                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      localStorage                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │  ogsm_v1    │  │  goals_v1   │  │   kpis_v1   │            │
│  │             │  │             │  │             │            │
│  │  [OGSM[]]   │  │  [Goal[]]   │  │   [KPI[]]   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │strategies_v1│  │ actions_v1  │  │  tasks_v1   │            │
│  │             │  │             │  │             │            │
│  │[Strategy[]] │  │ [Action[]]  │  │  [Task[]]   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

## Data Relationships

```
┌──────────────────────────────────────────────────────────────────┐
│                         OGSM (Root Entity)                        │
│  • id, name, objective                                            │
│  • goalIds: string[]                                              │
│  • strategyIds: string[]                                          │
│  • createdAt, updatedAt                                           │
└────────┬──────────────────────────────────────┬──────────────────┘
         │                                      │
         ▼                                      ▼
┌────────────────────┐               ┌────────────────────┐
│       Goal         │               │     Strategy       │
│  • id, name        │               │  • id, name        │
│  • kpiIds: []      │               │  • dashboardKpiIds │
│  • description     │               │  • actionIds: []   │
└────────┬───────────┘               └────────┬───────────┘
         │                                    │
         ▼                                    ▼
┌────────────────────┐               ┌────────────────────┐
│        KPI         │               │      Action        │
│  • id, name        │◄──────────────│  • id, name        │
│  • target, current │  (shared by   │  • taskIds: []     │
│  • unit            │   both)       └────────┬───────────┘
└────────────────────┘                        │
                                              ▼
                                     ┌────────────────────┐
                                     │       Task         │
                                     │  • id, name        │
                                     │  • status          │
                                     └────────────────────┘
```

## API Call Flow

### Example: Get OGSM with Full Details

```
User Code:
  getOGSMWithDetails(id)
       │
       ▼
┌──────────────────────────────────────────┐
│  src/api/helpers.ts                      │
│  getOGSMWithDetails(id)                  │
└──────┬───────────────────────────────────┘
       │
       ├─► getOGSMById(id)                 ──┐
       │                                      │
       ├─► getGoalsWithDetails(goalIds)   ──┤
       │   ├─► getGoalsByIds(ids)            │
       │   └─► getKPIsByIds(kpiIds)          │  All async
       │                                      │  parallel
       └─► getStrategiesWithDetails(ids)  ──┤  fetches
           ├─► getStrategiesByIds(ids)       │
           ├─► getKPIsByIds(kpiIds)          │
           └─► getActionsWithDetails(ids) ──┘
               ├─► getActionsByIds(ids)
               └─► getTasksByIds(taskIds)
                        │
                        ▼
               ┌─────────────────┐
               │  localStorage   │
               └─────────────────┘
                        │
                        ▼
               Assembled OGSMWithDetails
```

## Storage Strategy: Normalized vs Denormalized

### ❌ Denormalized (Not Used)

```javascript
// Everything nested - causes duplication
{
  id: '1',
  name: 'OGSM',
  goals: [
    {
      id: 'g1',
      kpis: [
        { id: 'k1', name: 'KPI 1' }  // Duplicated if used elsewhere
      ]
    }
  ]
}
```

### ✅ Normalized (Used)

```javascript
// OGSM references IDs only
OGSM: { id: '1', goalIds: ['g1'] }

// Goals stored separately
Goal: { id: 'g1', kpiIds: ['k1'] }

// KPIs stored separately (can be shared)
KPI: { id: 'k1', name: 'KPI 1' }
```

**Benefits:**

- No data duplication
- Easy updates (single source of truth)
- KPIs can be shared between Goals and Strategies
- Efficient storage
- Clear separation of concerns

## Type System Hierarchy

```typescript
// Base entity types
interface OGSM {
    id: string;
    goalIds: string[]; // References only
    strategyIds: string[]; // References only
    // ...
}

// Input types (for create)
type CreateOGSMInput = Omit<OGSM, 'id' | 'createdAt' | 'updatedAt'>;

// Update types (for partial updates)
type UpdateOGSMInput = Partial<Omit<OGSM, 'id' | 'createdAt'>>;

// Detail types (with nested data)
interface OGSMWithDetails extends Omit<OGSM, 'goalIds' | 'strategyIds'> {
    goals: GoalWithDetails[]; // Populated objects
    strategies: StrategyWithDetails[]; // Populated objects
}
```

## Error Handling Pattern

```typescript
// All APIs use tryCatch wrapper
const [result, error] = await tryCatch(
    (async () => {
        await simulateApiDelay();
        // ... perform operation
        return data;
    })()
);

if (error) {
    throw new Error(`Failed to...: ${error.message}`);
}

return result;
```

## File Organization

```
src/
├── api/
│   ├── index.ts       ────► Exports all APIs
│   ├── ogsm.ts        ────► OGSM CRUD
│   ├── goals.ts       ────► Goal CRUD + getGoalsWithDetails
│   ├── kpis.ts        ────► KPI CRUD
│   ├── strategies.ts  ────► Strategy CRUD + getStrategiesWithDetails
│   ├── actions.ts     ────► Action CRUD + getActionsWithDetails
│   ├── tasks.ts       ────► Task CRUD
│   └── helpers.ts     ────► getOGSMWithDetails (assembles everything)
│
├── types/
│   └── index.ts       ────► All TypeScript interfaces
│
└── utils/
    ├── storage.ts     ────► localStorage helpers, versioned keys
    ├── seedData.ts    ────► Initial data seeding
    └── tryCatch.ts    ────► Error handling wrapper
```

## Key Design Decisions

### 1. Normalized Storage

- Each entity type has its own localStorage key
- Entities reference each other by ID
- No nested/embedded objects in storage

### 2. Versioned Keys

- All keys have `_v1` suffix
- Enables future database migrations
- Example: `ogsm_v1` → `ogsm_v2`

### 3. Async APIs

- All operations are async
- 100ms simulated delay
- Mimics real backend behavior

### 4. Type Safety

- Full TypeScript coverage
- Separate types for Create/Update/Read
- WithDetails types for nested data

### 5. Console API

- All functions exposed via `window.ogsmApi`
- Easy testing and debugging
- No need for UI during development

### 6. Error Handling

- Consistent `tryCatch` wrapper
- Descriptive error messages
- Type-safe error handling

## Performance Considerations

### Current Implementation (Good for MVP)

- Simple localStorage reads/writes
- No caching layer
- Fetch nested data on demand

### Future Optimizations

- Add Tanstack Query for caching
- Implement optimistic updates
- Add batch operations
- Consider IndexedDB for large datasets
- Add request deduplication

## Testing Strategy

### Manual Testing (Browser Console)

```javascript
// Quick tests in console
await window.ogsmApi.getAllOGSMs();
await window.ogsmApi.createTask({ name: 'Test', status: 'pending' });
```

### Future: Unit Tests

```typescript
describe('OGSM API', () => {
  it('should create OGSM', async () => {
    const ogsm = await createOGSM({ ... });
    expect(ogsm.id).toBeDefined();
  });
});
```

### Future: Integration Tests

```typescript
describe('Full OGSM Flow', () => {
    it('should create complete OGSM with nested data', async () => {
        // Create KPI, Goal, Strategy, Action, Task
        // Assemble into OGSM
        // Verify with getOGSMWithDetails
    });
});
```

## Migration Path (v1 → v2)

When database schema changes:

```typescript
// New migration utility
function migrateV1ToV2() {
    // Read v1 data
    const v1Data = readFromStorage('ogsm_v1');

    // Transform data
    const v2Data = v1Data.map(transform);

    // Write v2 data
    writeToStorage('ogsm_v2', v2Data);

    // Remove v1 data
    localStorage.removeItem('ogsm_v1');
}
```

## Summary

This data layer provides:

- ✅ Complete CRUD for all entities
- ✅ Normalized, efficient storage
- ✅ Type-safe APIs
- ✅ Easy testing via console
- ✅ Future-proof with versioning
- ✅ Rich seed data included
- ✅ Modular, maintainable code
