# EcoTrack Pro - Demo Components

This folder contains the refactored components from the original `ecotrack-pro-spa.ts` monolithic file.

## Overview

The original 817-line single-file Angular component has been broken down into smaller, reusable, and maintainable components following Angular best practices.

## Component Structure

```
demo/
├── models.ts                           # Shared TypeScript interfaces
├── styles.css                          # Shared CSS styles (M3 theme)
├── app-ecotrack-demo.component.ts      # Main orchestrator component
├── sidebar.component.ts                # Navigation sidebar
├── header.component.ts                 # Top header with tenant selector
├── dashboard-view.component.ts         # Dashboard view with KPI cards and charts
├── ledger-view.component.ts            # Emission records ledger table
├── strategy-view.component.ts          # AI strategy and chat interface
├── kpi-card.component.ts               # Reusable KPI card component
├── telemetry-badge.component.ts        # Floating telemetry status badge
├── index.ts                            # Barrel export file
└── README.md                           # This file
```

## Component Descriptions

### 1. **models.ts**
Defines shared TypeScript interfaces:
- `EmissionRecord`: Carbon emission data structure
- `TenantMetadata`: Tenant organization information
- `NavItem`: Navigation menu item structure

### 2. **app-ecotrack-demo.component.ts** (Main Component)
- Orchestrates all child components
- Manages application state using Angular signals
- Handles data generation and library loading
- Coordinates view switching and tenant selection
- ~170 lines (down from 817)

### 3. **sidebar.component.ts**
- Displays EcoTrack logo
- Navigation menu with active state
- Tenant profile card at bottom
- Emits view change events

### 4. **header.component.ts**
- Breadcrumb navigation
- Tenant dropdown selector
- Compute quota display
- CBAM generation button

### 5. **dashboard-view.component.ts**
- Three KPI cards (using KpiCardComponent)
- Emission velocity chart (Chart.js line chart)
- Factor breakdown chart (Chart.js doughnut chart)
- Chart refresh capabilities

### 6. **ledger-view.component.ts**
- Emission records table (Material table)
- Scope classification badges
- Confidence score visualization
- Audit log access button

### 7. **strategy-view.component.ts**
- Neural strategy optimizer panel
- AI response display with loading state
- EcoAssistant chat interface
- Latency analysis visualization (Plotly)

### 8. **kpi-card.component.ts** (Reusable)
- Configurable KPI display card
- Optional progress bar
- Customizable colors and icons
- Footer text options

### 9. **telemetry-badge.component.ts**
- Fixed position floating badge
- Shows telemetry stream status
- Animated pulse indicator

### 10. **styles.css**
- Material M3 theme variables
- Glass morphism effects
- Animations and transitions
- Table and form styling
- Custom scrollbar styles

## Key Improvements

1. **Separation of Concerns**: Each component has a single, well-defined responsibility
2. **Reusability**: KpiCardComponent can be used across different views
3. **Maintainability**: Smaller files are easier to understand and modify
4. **Testability**: Each component can be tested independently
5. **Type Safety**: Shared models ensure consistent data structures
6. **Code Organization**: Related functionality is grouped together

## Usage

Import the main component in your Angular application:

```typescript
import { AppEcotrackDemoComponent } from './demo/app-ecotrack-demo.component';

// In your module or component
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppEcotrackDemoComponent],
  template: '<app-ecotrack-demo></app-ecotrack-demo>'
})
export class AppComponent {}
```

Or use individual components:

```typescript
import { SidebarComponent, HeaderComponent } from './demo';
```

## Dependencies

All components are standalone Angular components (Angular 16+) and require:
- `@angular/core`
- `@angular/common`
- `@angular/material` (various modules)
- `@angular/forms`
- Chart.js (loaded via CDN)
- Plotly (loaded via CDN)

## Component Communication

- **Parent to Child**: Uses `@Input()` decorators
- **Child to Parent**: Uses `@Output()` EventEmitters
- **State Management**: Angular signals for reactive state

## Material M3 Design

All components follow Material Design 3 principles:
- Custom emerald color scheme
- Glass morphism effects
- Proper elevation and shadows
- Responsive typography
- Icon system (Material Icons)

## Notes

- The main component loads Chart.js and Plotly dynamically from CDN
- Charts are initialized after view init using ViewChild references
- Tenant data and emission records are generated programmatically
- AI responses are mocked with setTimeout for demonstration
