# OGSM API Quick Reference

Quick reference for all available API methods. All methods are accessible via `window.ogsmApi` in the browser console.

## 📋 Quick Test Commands

```javascript
// View everything
await window.ogsmApi.getAllOGSMs();
await window.ogsmApi.getAllGoals();
await window.ogsmApi.getAllKPIs();
await window.ogsmApi.getAllStrategies();
await window.ogsmApi.getAllActions();
await window.ogsmApi.getAllTasks();

// Get detailed view
const ogsms = await window.ogsmApi.getAllOGSMs();
await window.ogsmApi.getOGSMWithDetails(ogsms[0].id);

// Reset data
window.ogsmApi.clearAllStorage();
window.ogsmApi.seedDatabase();
```

## 🔍 Read Operations

| Method                       | Description                      | Example                                              |
| ---------------------------- | -------------------------------- | ---------------------------------------------------- |
| `getAllOGSMs()`              | Get all OGSM plans               | `await window.ogsmApi.getAllOGSMs()`                 |
| `getOGSMById(id)`            | Get single OGSM                  | `await window.ogsmApi.getOGSMById('123')`            |
| `getOGSMWithDetails(id)`     | Get OGSM with all nested data    | `await window.ogsmApi.getOGSMWithDetails('123')`     |
| `getAllGoals()`              | Get all goals                    | `await window.ogsmApi.getAllGoals()`                 |
| `getGoalById(id)`            | Get single goal                  | `await window.ogsmApi.getGoalById('123')`            |
| `getGoalWithDetails(id)`     | Get goal with KPIs               | `await window.ogsmApi.getGoalWithDetails('123')`     |
| `getGoalsByIds(ids)`         | Get multiple goals               | `await window.ogsmApi.getGoalsByIds(['1', '2'])`     |
| `getAllKPIs()`               | Get all KPIs                     | `await window.ogsmApi.getAllKPIs()`                  |
| `getKPIById(id)`             | Get single KPI                   | `await window.ogsmApi.getKPIById('123')`             |
| `getKPIsByIds(ids)`          | Get multiple KPIs                | `await window.ogsmApi.getKPIsByIds(['1', '2'])`      |
| `getAllStrategies()`         | Get all strategies               | `await window.ogsmApi.getAllStrategies()`            |
| `getStrategyById(id)`        | Get single strategy              | `await window.ogsmApi.getStrategyById('123')`        |
| `getStrategyWithDetails(id)` | Get strategy with KPIs & actions | `await window.ogsmApi.getStrategyWithDetails('123')` |
| `getAllActions()`            | Get all actions                  | `await window.ogsmApi.getAllActions()`               |
| `getActionById(id)`          | Get single action                | `await window.ogsmApi.getActionById('123')`          |
| `getActionWithDetails(id)`   | Get action with tasks            | `await window.ogsmApi.getActionWithDetails('123')`   |
| `getAllTasks()`              | Get all tasks                    | `await window.ogsmApi.getAllTasks()`                 |
| `getTaskById(id)`            | Get single task                  | `await window.ogsmApi.getTaskById('123')`            |

## ➕ Create Operations

| Method                  | Input                                                | Example                                                                                                 |
| ----------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `createOGSM(input)`     | `{ name, objective, goalIds, strategyIds }`          | `await window.ogsmApi.createOGSM({ name: 'My Plan', objective: 'Grow', goalIds: [], strategyIds: [] })` |
| `createGoal(input)`     | `{ name, description?, kpiIds }`                     | `await window.ogsmApi.createGoal({ name: 'Goal 1', kpiIds: [] })`                                       |
| `createKPI(input)`      | `{ name, target, current, unit? }`                   | `await window.ogsmApi.createKPI({ name: 'KPI 1', target: 100, current: 50, unit: '%' })`                |
| `createStrategy(input)` | `{ name, description?, dashboardKpiIds, actionIds }` | `await window.ogsmApi.createStrategy({ name: 'Strategy 1', dashboardKpiIds: [], actionIds: [] })`       |
| `createAction(input)`   | `{ name, description?, taskIds }`                    | `await window.ogsmApi.createAction({ name: 'Action 1', taskIds: [] })`                                  |
| `createTask(input)`     | `{ name, status }`                                   | `await window.ogsmApi.createTask({ name: 'Task 1', status: 'pending' })`                                |

## ✏️ Update Operations

| Method                      | Parameters                             | Example                                                           |
| --------------------------- | -------------------------------------- | ----------------------------------------------------------------- |
| `updateOGSM(id, input)`     | `id: string, input: Partial<OGSM>`     | `await window.ogsmApi.updateOGSM('123', { name: 'Updated' })`     |
| `updateGoal(id, input)`     | `id: string, input: Partial<Goal>`     | `await window.ogsmApi.updateGoal('123', { name: 'Updated' })`     |
| `updateKPI(id, input)`      | `id: string, input: Partial<KPI>`      | `await window.ogsmApi.updateKPI('123', { current: 75 })`          |
| `updateStrategy(id, input)` | `id: string, input: Partial<Strategy>` | `await window.ogsmApi.updateStrategy('123', { name: 'Updated' })` |
| `updateAction(id, input)`   | `id: string, input: Partial<Action>`   | `await window.ogsmApi.updateAction('123', { name: 'Updated' })`   |
| `updateTask(id, input)`     | `id: string, input: Partial<Task>`     | `await window.ogsmApi.updateTask('123', { status: 'completed' })` |

## 🗑️ Delete Operations

| Method               | Returns            | Example                                      |
| -------------------- | ------------------ | -------------------------------------------- |
| `deleteOGSM(id)`     | `Promise<boolean>` | `await window.ogsmApi.deleteOGSM('123')`     |
| `deleteGoal(id)`     | `Promise<boolean>` | `await window.ogsmApi.deleteGoal('123')`     |
| `deleteKPI(id)`      | `Promise<boolean>` | `await window.ogsmApi.deleteKPI('123')`      |
| `deleteStrategy(id)` | `Promise<boolean>` | `await window.ogsmApi.deleteStrategy('123')` |
| `deleteAction(id)`   | `Promise<boolean>` | `await window.ogsmApi.deleteAction('123')`   |
| `deleteTask(id)`     | `Promise<boolean>` | `await window.ogsmApi.deleteTask('123')`     |

## 🔧 Utility Functions

| Method              | Description      | Example                            |
| ------------------- | ---------------- | ---------------------------------- |
| `clearAllStorage()` | Clear all data   | `window.ogsmApi.clearAllStorage()` |
| `seedDatabase()`    | Load sample data | `window.ogsmApi.seedDatabase()`    |

## 📝 Common Workflows

### View All Data

```javascript
// Get overview of all entities
const ogsms = await window.ogsmApi.getAllOGSMs();
const goals = await window.ogsmApi.getAllGoals();
const kpis = await window.ogsmApi.getAllKPIs();
const strategies = await window.ogsmApi.getAllStrategies();
const actions = await window.ogsmApi.getAllActions();
const tasks = await window.ogsmApi.getAllTasks();
```

### Create Complete Workflow

```javascript
// 1. Create KPI
const kpi = await window.ogsmApi.createKPI({
    name: 'Projects Completed',
    target: 10,
    current: 3,
    unit: 'count',
});

// 2. Create Goal with KPI
const goal = await window.ogsmApi.createGoal({
    name: 'Build Portfolio',
    description: 'Complete 10 projects',
    kpiIds: [kpi.id],
});

// 3. Create Tasks
const task1 = await window.ogsmApi.createTask({
    name: 'Setup project structure',
    status: 'completed',
});

const task2 = await window.ogsmApi.createTask({
    name: 'Implement features',
    status: 'in-progress',
});

// 4. Create Action with Tasks
const action = await window.ogsmApi.createAction({
    name: 'Build E-commerce Site',
    description: 'Full-stack e-commerce application',
    taskIds: [task1.id, task2.id],
});

// 5. Create Strategy with Action
const strategy = await window.ogsmApi.createStrategy({
    name: 'Hands-on Learning',
    description: 'Learn by building real projects',
    dashboardKpiIds: [kpi.id],
    actionIds: [action.id],
});

// 6. Create OGSM
const ogsm = await window.ogsmApi.createOGSM({
    name: 'Web Developer Career Plan',
    objective: 'Become a full-stack developer in 2 years',
    goalIds: [goal.id],
    strategyIds: [strategy.id],
});

// 7. View complete OGSM with all nested data
const complete = await window.ogsmApi.getOGSMWithDetails(ogsm.id);
console.log(complete);
```

### Update Task Status

```javascript
// Get all pending tasks
const tasks = await window.ogsmApi.getAllTasks();
const pendingTasks = tasks.filter((t) => t.status === 'pending');

// Update first task to in-progress
await window.ogsmApi.updateTask(pendingTasks[0].id, {
    status: 'in-progress',
});
```

### Update KPI Progress

```javascript
// Get all KPIs
const kpis = await window.ogsmApi.getAllKPIs();

// Update progress on first KPI
await window.ogsmApi.updateKPI(kpis[0].id, {
    current: kpis[0].current + 10,
});
```

### Reset and Start Fresh

```javascript
// Clear everything
window.ogsmApi.clearAllStorage();

// Load sample data
window.ogsmApi.seedDatabase();

// Verify
const ogsms = await window.ogsmApi.getAllOGSMs();
console.log(`Loaded ${ogsms.length} OGSM plan(s)`);
```

## 🎯 Task Status Values

- `'pending'` - Not started
- `'in-progress'` - Currently working on
- `'completed'` - Finished

## 💡 Tips

1. **Use Details Functions**: When you need nested data, use `getXWithDetails()` functions
2. **IDs are References**: Store IDs in arrays, not full objects
3. **Async/Await**: All API functions are async, always use `await`
4. **Error Handling**: APIs throw errors with descriptive messages
5. **Console Testing**: Test everything in browser console before using in components
