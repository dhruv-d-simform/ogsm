# Components Folder Organization

This folder contains all React components organized into logical subdirectories for better maintainability and discoverability.

## Folder Structure

### `/layout`

Layout-related components that define the application structure:

- `Layout.tsx` - Main application layout wrapper with sidebar and content area
- `Sidebar.tsx` - Sidebar navigation with OGSM list and search functionality

### `/ogsm`

Core OGSM-specific components:

- `OgsmBoard.tsx` - Main board displaying objectives, goals, strategies, and measures
- `OgsmHeader.tsx` - Header component for OGSM detail pages
- `CreateOgsmDialog.tsx` - Dialog for creating new OGSM plans

### `/sections`

Section components that organize different parts of the OGSM board:

- `ObjectiveSection.tsx` - Displays and manages the objective section
- `GoalsSection.tsx` - Displays and manages the goals section
- `StrategySection.tsx` - Displays and manages the strategies section
- `SectionHeader.tsx` - Reusable header component for sections

### `/items`

Individual item components representing OGSM entities:

- `GoalItem.tsx` - Individual goal item with inline editing
- `StrategyItem.tsx` - Individual strategy item with KPIs and actions
- `ActionItem.tsx` - Individual action item with tasks
- `TaskItem.tsx` - Individual task item
- `KPIItem.tsx` - Individual KPI item (used in goals)
- `DashboardKpiItem.tsx` - Dashboard-style KPI item (used in strategies)

### `/ui`

shadcn/ui components (pre-existing):

- Standard UI primitives like buttons, dialogs, inputs, etc.

## Import Guidelines

Each folder contains an `index.ts` file that exports all components from that folder. You can import components in two ways:

### Direct Import (specific file)

```typescript
import { Layout } from '@/components/layout/Layout';
import { GoalItem } from '@/components/items/GoalItem';
```

### Barrel Import (from folder index)

```typescript
import { Layout, Sidebar } from '@/components/layout';
import { GoalItem, StrategyItem } from '@/components/items';
```

Both approaches work, but barrel imports are cleaner when importing multiple components from the same category.
