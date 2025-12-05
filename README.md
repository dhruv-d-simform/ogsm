# OGSM Planning Tool

> A comprehensive web application for creating and managing OGSM (Objectives, Goals, Strategies, Measures) plans with an intuitive interface and powerful tracking capabilities.

🚀 **[Live Demo](https://ogsm-clone.netlify.app/)**

---

## 📖 Table of Contents

- [Overview](#overview)
- [What is OGSM?](#what-is-ogsm)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Data Architecture](#data-architecture)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The OGSM Planning Tool is a React-based web application that helps individuals and teams create, manage, and track strategic plans using the OGSM framework. The app provides a visual, hierarchical view of objectives, goals, strategies, and measurable outcomes, making it easy to align actions with high-level aspirations.

**Key Highlights:**

- ✅ Create multiple OGSM plans
- ✅ Track progress with KPIs (Key Performance Indicators)
- ✅ Manage strategies, actions, and tasks
- ✅ Visual dashboard for quick insights
- ✅ Full CRUD operations for all entities
- ✅ Responsive design with Tailwind CSS
- ✅ No backend required - all data stored locally

---

## 🧩 What is OGSM?

**OGSM** stands for:

- **Objective**: Your long-term, aspirational goal. What do you want to achieve?
- **Goals**: Specific, measurable targets that support your objective.
- **Strategies**: The approaches or methods you'll use to achieve your goals.
- **Measures**: Metrics (KPIs) to track progress and success.

This framework helps break down complex objectives into actionable steps with clear accountability and measurable outcomes.

---

## ✨ Features

### Core Functionality

- **📋 Multiple OGSM Plans**: Create and manage multiple independent OGSM plans
- **🎯 Objective Definition**: Set clear, inspiring objectives for each plan
- **📊 Goal Management**: Define specific, measurable goals linked to objectives
- **🗺️ Strategy Planning**: Create strategies with actions and tasks
- **📈 KPI Tracking**: Track progress with customizable Key Performance Indicators
- **✅ Task Management**: Break down actions into manageable tasks with status tracking
- **🔍 Detail Views**: Comprehensive view of each OGSM plan with all nested details

### UI/UX Features

- **🎨 Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🌓 Clean Interface**: Intuitive, distraction-free design
- **⚡ Fast Performance**: Optimized with React Query for smooth interactions
- **🔄 Real-time Updates**: Changes reflect immediately across the application

### Developer Features

- **🛠️ Console API**: Full API access via `window.ogsmApi` for testing
- **📦 Mock Data Layer**: Complete mock backend with realistic seed data
- **🔒 Type Safety**: Full TypeScript coverage for reliability
- **🎭 Read-Only Mode**: Toggle between view and edit modes
- **📚 Rich Seed Data**: Includes 14+ sample OGSM plans across various domains

---

## 🛠️ Tech Stack

### Frontend

- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript 5.7](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React Router v7](https://reactrouter.com/)** - Client-side routing
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### State Management & Forms

- **[TanStack Query (React Query)](https://tanstack.com/query/)** - Async state management
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - Schema validation

### Development Tools

- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

### Data Layer

- **localStorage** - Client-side data persistence
- **Mock API Layer** - Simulates backend with async operations
- **Normalized Data Structure** - Efficient, non-duplicative storage

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/dhruv-d-simform/ogsm.git
cd ogsm
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
ogsm/
├── public/                    # Static assets
├── src/
│   ├── api/                   # Mock data layer (backend simulation)
│   │   ├── index.ts           # API exports
│   │   ├── ogsm.ts            # OGSM CRUD operations
│   │   ├── goals.ts           # Goals CRUD
│   │   ├── strategies.ts      # Strategies CRUD
│   │   ├── actions.ts         # Actions CRUD
│   │   ├── tasks.ts           # Tasks CRUD
│   │   ├── kpis.ts            # KPIs CRUD
│   │   └── helpers.ts         # Helper functions (e.g., getOGSMWithDetails)
│   │
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components (button, dialog, etc.)
│   │   ├── Layout.tsx         # App layout wrapper
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   ├── OgsmBoard.tsx      # Main OGSM board view
│   │   ├── ObjectiveSection.tsx
│   │   ├── GoalsSection.tsx
│   │   ├── StrategySection.tsx
│   │   └── ...                # Other UI components
│   │
│   ├── contexts/              # React contexts
│   │   └── ReadOnlyContext.tsx # Read-only mode context
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useOgsm.ts         # OGSM data fetching with React Query
│   │   ├── useGoal.ts         # Goals mutations
│   │   ├── useStrategy.ts     # Strategies mutations
│   │   ├── useAction.ts       # Actions mutations
│   │   ├── useTask.ts         # Tasks mutations
│   │   └── useKpi.ts          # KPIs mutations
│   │
│   ├── lib/                   # Utilities
│   │   ├── queryKeys.ts       # React Query cache keys
│   │   └── utils.ts           # Helper utilities (cn, etc.)
│   │
│   ├── mockData/              # Seed data for the app
│   │   ├── index.ts           # All mock OGSM plans
│   │   ├── coffee-shop-expansion.ts
│   │   ├── mobile-app-launch.ts
│   │   └── ...                # 14+ sample plans
│   │
│   ├── pages/                 # Page components
│   │   ├── HomePage.tsx       # Dashboard with all OGSM plans
│   │   └── OgsmDetailPage.tsx # Detailed view of a single OGSM
│   │
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts           # All interfaces (OGSM, Goal, Strategy, etc.)
│   │
│   ├── utils/                 # Core utilities
│   │   ├── storage.ts         # localStorage helpers
│   │   ├── seedData.ts        # Data seeding logic
│   │   └── tryCatch.ts        # Error handling wrapper
│   │
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # App entry point
│   ├── router.tsx             # React Router configuration
│   └── index.css              # Global styles
│
├── index.html                 # HTML entry point
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

---

## 💡 Usage

### Creating a New OGSM Plan

1. Click the **"Create New OGSM"** button on the homepage
2. Enter a name and objective for your plan
3. Click **"Create"** to save

### Managing Goals

1. Open an OGSM plan
2. In the **Goals** section, click **"Add Goal"**
3. Enter goal details and attach KPIs to track progress
4. Click **"Save"**

### Managing Strategies

1. In the **Strategies** section, click **"Add Strategy"**
2. Define your strategy and add dashboard KPIs
3. Add actions and break them down into tasks
4. Track task completion to monitor progress

### Tracking KPIs

- KPIs show current vs. target values
- Visual progress bars indicate completion percentage
- KPIs can be shared between Goals and Strategies
- Update KPI values as you make progress

### Using the Console API

Open your browser's console and try:

```javascript
// Get all OGSM plans
await window.ogsmApi.getAllOGSMs();

// Get a specific OGSM with all details
await window.ogsmApi.getOGSMWithDetails('ogsm-id');

// Create a new task
await window.ogsmApi.createTask({
    name: 'New Task',
    status: 'pending',
});

// Update KPI values
await window.ogsmApi.updateKPI('kpi-id', {
    current: 75,
});
```

---

## 🏗️ Data Architecture

### Storage Strategy

The app uses a **normalized data structure** stored in `localStorage`:

```
localStorage
├── ogsm_v1          → [OGSM[]]
├── goals_v1         → [Goal[]]
├── strategies_v1    → [Strategy[]]
├── actions_v1       → [Action[]]
├── tasks_v1         → [Task[]]
└── kpis_v1          → [KPI[]]
```

### Data Relationships

```
OGSM
├── goalIds[] ────────► Goals[]
│                       └── kpiIds[] ────► KPIs[]
│
└── strategyIds[] ───► Strategies[]
                        ├── dashboardKpiIds[] ──► KPIs[]
                        └── actionIds[] ──────► Actions[]
                                                └── taskIds[] ──► Tasks[]
```

### Key Design Decisions

1. **Normalized Storage**: Each entity type has its own storage key
2. **ID References**: Entities reference each other by ID (not nested objects)
3. **Shared KPIs**: KPIs can be used by both Goals and Strategies
4. **Async APIs**: All operations are async with simulated delays
5. **Type Safety**: Full TypeScript coverage for all entities
6. **Versioned Keys**: All storage keys have `_v1` suffix for future migrations

For more details, see [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

### Code Style Guidelines

- **Functional Components**: Use functional components with hooks
- **TypeScript**: Use TypeScript for all files (no `.js/.jsx`)
- **Named Exports**: Prefer named exports over default exports
- **Import Alias**: Use `@/` to reference `src/` directory
- **Error Handling**: Use `tryCatch` wrapper for async operations
- **Documentation**: Add JSDoc comments for complex functions

### Adding New Features

1. **Define Types**: Add TypeScript interfaces in `src/types/`
2. **Create API Layer**: Add CRUD operations in `src/api/`
3. **Create Hooks**: Add React Query hooks in `src/hooks/`
4. **Build Components**: Create UI components in `src/components/`
5. **Add Pages**: Create page components in `src/pages/`

### Testing

#### Manual Testing (Browser Console)

```javascript
// Test API directly
await window.ogsmApi.createOGSM({
    name: 'Test Plan',
    objective: 'Test Objective',
    goalIds: [],
    strategyIds: [],
});
```

#### Future: Automated Tests

The project is ready for unit and integration tests with tools like:

- **Vitest** for unit tests
- **React Testing Library** for component tests
- **Playwright** or **Cypress** for E2E tests

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** following the code style guidelines
4. **Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Contribution Ideas

- 🎨 Add dark mode support
- 📱 Improve mobile responsiveness
- 🔍 Add search and filtering
- 📊 Add data visualization (charts, graphs)
- 📤 Add export functionality (PDF, CSV)
- ☁️ Add cloud sync / backend integration
- 🔔 Add notifications and reminders
- 🌐 Add internationalization (i18n)
- ♿ Improve accessibility (a11y)
- ✅ Add automated tests

---

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful, accessible components
- **TanStack Query** for powerful async state management
- **Lucide** for the comprehensive icon library
- The **React** and **TypeScript** communities for amazing tools and resources

---

## 📞 Contact & Support

- **Live Demo**: [https://ogsm-clone.netlify.app/](https://ogsm-clone.netlify.app/)
- **GitHub**: [https://github.com/dhruv-d-simform/ogsm](https://github.com/dhruv-d-simform/ogsm)
- **Issues**: [Report a bug or request a feature](https://github.com/dhruv-d-simform/ogsm/issues)

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

⭐ Star this repo if you find it helpful!

</div>
