# Component Architecture Visualization

## Original Structure (Before)
```
┌────────────────────────────────────────┐
│                                        │
│    ecotrack-pro-spa.ts (817 lines)    │
│                                        │
│  • All UI templates embedded          │
│  • All business logic mixed in        │
│  • All styles inline                  │
│  • All chart initialization           │
│  • All data generation                │
│  • All event handlers                 │
│                                        │
│  ❌ Hard to maintain                   │
│  ❌ Not reusable                       │
│  ❌ Difficult to test                  │
│  ❌ Merge conflicts common             │
│                                        │
└────────────────────────────────────────┘
```

## Refactored Structure (After)
```
┌─────────────────────────────────────────────────────────────────┐
│                     demo/ (15 files)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📄 models.ts (25 lines)                                        │
│  └─ Shared interfaces: EmissionRecord, TenantMetadata, NavItem │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🎯 app-ecotrack-demo.component.ts (238 lines)                  │
│  └─ Main orchestrator with state management                    │
│     ├── Signals: currentView, selectedTenantId, isAnalyzing    │
│     ├── Computed: records, totalImpact, avgConfidence          │
│     └── Methods: generateRecords(), ensureLibraries()          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  PRESENTATIONAL COMPONENTS                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🧩 sidebar.component.ts (73 lines)                             │
│  ├── Input: navItems, currentView, activeTenantName            │
│  └── Output: viewChange                                        │
│                                                                 │
│  🧩 header.component.ts (62 lines)                              │
│  ├── Input: currentView, selectedTenantId, tenantPool          │
│  └── Output: tenantChange                                      │
│                                                                 │
│  🧩 dashboard-view.component.ts (151 lines)                     │
│  ├── Input: totalImpact, avgConfidence, scope[1-3]Total        │
│  └── Features: KPI cards, Chart.js visualizations              │
│                                                                 │
│  🧩 ledger-view.component.ts (105 lines)                        │
│  ├── Input: records, activeTenantName                          │
│  └── Features: Material table with scope badges                │
│                                                                 │
│  🧩 strategy-view.component.ts (157 lines)                      │
│  ├── Input: isAnalyzing, aiResponse, activeTenantIndustry      │
│  ├── Output: generateInsights, askAssistant                    │
│  └── Features: AI chat, Plotly visualization                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  REUSABLE UI COMPONENTS                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🎨 kpi-card.component.ts (56 lines) ⭐ HIGHLY REUSABLE        │
│  ├── Input: title, value, unit, icon, color, progressBar       │
│  └── Used 3 times in dashboard-view                            │
│                                                                 │
│  🎨 telemetry-badge.component.ts (18 lines)                     │
│  └── Floating status indicator                                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  SHARED RESOURCES                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🎨 styles.css (150 lines)                                      │
│  └─ M3 theme, glass effects, animations, table styles          │
│                                                                 │
│  📦 index.ts (12 lines)                                         │
│  └─ Barrel exports for easy imports                            │
│                                                                 │
│  🚀 main.ts (20 lines)                                          │
│  └─ Standalone bootstrap example                               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  DOCUMENTATION                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📖 README.md (152 lines)                                       │
│  └─ Complete component documentation                           │
│                                                                 │
│  📖 REFACTORING_COMPARISON.md (165 lines)                       │
│  └─ Detailed before/after analysis                             │
│                                                                 │
│  📖 component-architecture.html (271 lines)                     │
│  └─ Visual HTML documentation                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

  ✅ Maintainable    ✅ Reusable    ✅ Testable    ✅ Scalable
```

## Component Tree at Runtime
```
AppEcotrackDemoComponent
│
├── SidebarComponent
│   ├── Logo & Branding
│   ├── Navigation Menu
│   │   ├── Dashboard
│   │   ├── Ledger
│   │   └── Strategy
│   └── Tenant Profile Card
│
├── HeaderComponent
│   ├── Breadcrumb (Vault > [View])
│   ├── Tenant Selector (12 tenants)
│   ├── Compute Quota Display
│   └── CBAM Button
│
├── View Container (@switch on currentView)
│   │
│   ├─ case 'dashboard'
│   │  └── DashboardViewComponent
│   │      ├── KpiCardComponent (Verified Footprint)
│   │      ├── KpiCardComponent (Trust Index)
│   │      ├── KpiCardComponent (Est. CBAM Tax)
│   │      ├── Chart Panel (Emission Velocity - Line Chart)
│   │      └── Chart Panel (Factor Breakdown - Doughnut)
│   │
│   ├─ case 'ledger'
│   │  └── LedgerViewComponent
│   │      ├── Ledger Header
│   │      ├── Audit Log Button
│   │      └── Material Table (3 records per tenant)
│   │          ├── Scope Badge
│   │          ├── Source & Date
│   │          ├── Impact (kg CO2e)
│   │          └── Confidence Bar
│   │
│   └─ case 'ai'
│      └── StrategyViewComponent
│          ├── Neural Strategy Panel
│          │   ├── Loading Spinner (when analyzing)
│          │   ├── AI Response Display
│          │   └── Execute Button
│          ├── EcoAssistant Chat
│          │   ├── Chat Input
│          │   └── Send Button
│          └── Latency Analysis (Plotly Scatter)
│
└── TelemetryBadgeComponent (Fixed Position)
    ├── Pulse Indicator
    └── Trace ID
```

## Data Flow
```
┌──────────────────────────────────────────────────────────────┐
│  State Management (Signals)                                  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  currentView: signal<string>                                 │
│  selectedTenantId: signal<string>                            │
│  isAnalyzing: signal<boolean>                                │
│  aiResponse: signal<string | null>                           │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Computed Values (Auto-update on signal changes)            │
│                                                              │
│  activeTenantName = computed(...)                            │
│  activeTenantIndustry = computed(...)                        │
│  records = computed(() => filter by selectedTenantId)        │
│  totalImpact = computed(() => sum carbon grams)              │
│  avgConfidence = computed(() => average confidence)          │
│  scope1Total, scope2Total, scope3Total = computed(...)       │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Effects (Side effects on signal changes)                    │
│                                                              │
│  effect(() => {                                              │
│    selectedTenantId();  // Watch for tenant changes          │
│    aiResponse.set(null);  // Reset AI response               │
│    refreshCharts();  // Update charts with new data          │
│  })                                                          │
│                                                              │
└──────────────────────────────────────────────────────────────┘

         ↓ @Input() bindings

┌──────────────────────────────────────────────────────────────┐
│  Child Components                                            │
├──────────────────────────────────────────────────────────────┤
│  Receive data via @Input(), emit events via @Output()        │
└──────────────────────────────────────────────────────────────┘

         ↑ @Output() events

┌──────────────────────────────────────────────────────────────┐
│  Parent Component                                            │
├──────────────────────────────────────────────────────────────┤
│  Updates signals based on child events                       │
│  currentView.set(newView)                                    │
│  selectedTenantId.set(newTenant)                             │
└──────────────────────────────────────────────────────────────┘
```

## Key Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Files | 1 | 15 | +1400% modularity |
| Largest file | 817 lines | 238 lines | 71% reduction |
| Reusable components | 0 | 1 (KpiCard) | ∞% increase |
| Documentation | 0 lines | 588 lines | New |
| Testable units | 1 | 8 | +700% |
| Average file size | 817 lines | ~80 lines | 90% reduction |

## Migration Guide

### Option 1: Use as standalone app
```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppEcotrackDemoComponent } from './demo';

bootstrapApplication(AppEcotrackDemoComponent);
```

### Option 2: Import in existing module
```typescript
// app.module.ts or app.component.ts
import { AppEcotrackDemoComponent } from './demo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppEcotrackDemoComponent],
  template: '<app-ecotrack-demo></app-ecotrack-demo>'
})
export class AppComponent {}
```

### Option 3: Use individual components
```typescript
import { KpiCardComponent, DashboardViewComponent } from './demo';

@Component({
  imports: [KpiCardComponent],
  template: `
    <app-kpi-card
      title="My Metric"
      [value]="myValue"
      unit="units"
      icon="dashboard"
      color="primary"
    ></app-kpi-card>
  `
})
export class MyComponent {}
```

## Best Practices Applied

✅ **Single Responsibility Principle**: Each component has one clear job
✅ **DRY (Don't Repeat Yourself)**: KpiCardComponent eliminates duplicate markup
✅ **Separation of Concerns**: Logic, presentation, and styles are separated
✅ **Component-Based Architecture**: Follows Angular best practices
✅ **Type Safety**: TypeScript interfaces ensure data consistency
✅ **Reactive Programming**: Uses signals for reactive state management
✅ **Documentation**: Comprehensive docs for easy onboarding
✅ **Maintainability**: Small files are easier to understand and modify
