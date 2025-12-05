# Mock OGSM Data

This folder contains realistic mock OGSM datasets used to seed the application's `localStorage`.

## Structure

Each file in this folder represents a single OGSM (Objectives, Goals, Strategies, Measures) plan with all its related data:

- **Goals** - Measurable targets supporting the objective
- **Strategies** - Approaches to achieve the goals
- **Actions** - Concrete activities within each strategy
- **Tasks** - Individual steps within each action
- **KPIs** - Metrics to track progress

## Available OGSM Datasets

1. **coffee-shop-expansion.ts** - A small coffee shop expanding from 1 to 3 locations
2. **fitness-transformation.ts** - Personal fitness journey to lose weight and get healthy
3. **mobile-app-launch.ts** - Startup launching their first mobile app
4. **youtube-channel-growth.ts** - Content creator building a YouTube channel
5. **learning-spanish.ts** - Learning Spanish to conversational fluency
6. **freelance-design-business.ts** - Designer building a freelance business
7. **home-renovation.ts** - Homeowner planning kitchen and bathroom renovation
8. **book-writing.ts** - Aspiring author writing and publishing first book
9. **marathon-training.ts** - Runner preparing for first marathon
10. **restaurant-opening.ts** - Entrepreneur opening a neighborhood restaurant
11. **ecommerce-store.ts** - Launching online store selling handmade products
12. **photography-business.ts** - Building wedding photography business
13. **podcast-launch.ts** - Launching successful entrepreneurship podcast
14. **online-course.ts** - Creating and selling online web development course

## Usage

All datasets are imported and combined in `index.ts`, which exports:

- `getAllMockData()` - Returns all OGSM data combined into a single dataset
- `MockDataset` - Type for a single OGSM with all related data
- `CombinedMockData` - Type for all OGSMs combined

The seed function in `src/utils/seedData.ts` uses this to populate `localStorage`.

## Design Principles

These mock datasets follow these principles:

1. **Realistic** - Based on real-world scenarios people can relate to
2. **Understandable** - No complex domain knowledge required
3. **Diverse** - Cover personal, business, creative, and fitness goals
4. **Valuable** - Demonstrate OGSM methodology clearly
5. **Progress Indicators** - Show varying stages of completion
