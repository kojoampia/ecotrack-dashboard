import { Component, signal, computed, effect, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { HeaderComponent } from './header.component';
import { DashboardViewComponent } from './dashboard-view.component';
import { LedgerViewComponent } from './ledger-view.component';
import { StrategyViewComponent } from './strategy-view.component';
import { TelemetryBadgeComponent } from './telemetry-badge.component';
import { EmissionRecord, TenantMetadata, NavItem } from './models';

@Component({
  selector: 'app-ecotrack-demo',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    DashboardViewComponent,
    LedgerViewComponent,
    StrategyViewComponent,
    TelemetryBadgeComponent,
  ],
  template: `
    <div class="m3-theme flex h-screen bg-surface text-on-surface overflow-hidden font-sans">
      <!-- Sidebar -->
      <app-sidebar
        [navItems]="navItems"
        [currentView]="currentView()"
        [activeTenantName]="activeTenantName()"
        [activeTenantIndustry]="activeTenantIndustry()"
        (viewChange)="currentView.set($event)"
      ></app-sidebar>

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col overflow-hidden relative">
        <!-- Header -->
        <app-header
          [currentView]="currentView()"
          [selectedTenantId]="selectedTenantId()"
          [tenantPool]="tenantPool"
          (tenantChange)="selectedTenantId.set($event)"
        ></app-header>

        <!-- Scrolled Content Area -->
        <div class="flex-1 overflow-y-auto p-10 lg:p-14 relative bg-surface scroll-custom">
          @switch (currentView()) { 
            @case ('dashboard') {
              <app-dashboard-view
                #dashboardView
                [totalImpact]="totalImpact()"
                [avgConfidence]="avgConfidence()"
                [scope1Total]="scope1Total()"
                [scope2Total]="scope2Total()"
                [scope3Total]="scope3Total()"
              ></app-dashboard-view>
            } 
            @case ('ledger') {
              <app-ledger-view 
                [records]="records()" 
                [activeTenantName]="activeTenantName()"
              ></app-ledger-view>
            } 
            @case ('ai') {
              <app-strategy-view
                [isAnalyzing]="isAnalyzing()"
                [aiResponse]="aiResponse()"
                [activeTenantIndustry]="activeTenantIndustry()"
                (generateInsights)="generateInsights()"
                (askAssistant)="askAssistant($event)"
              ></app-strategy-view>
            } 
          }
        </div>
      </main>

      <!-- Telemetry Badge -->
      <app-telemetry-badge></app-telemetry-badge>
    </div>
  `,
  styleUrls: ['./styles.css'],
})
export class AppEcotrackDemoComponent implements AfterViewInit {
  @ViewChild('dashboardView') dashboardView?: DashboardViewComponent;

  navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'ledger', label: 'Ledger', icon: 'menu_book' },
    { id: 'ai', label: 'Strategy', icon: 'auto_awesome' },
  ];

  tenantPool: TenantMetadata[] = [
    { id: 'tenant_steel_001', name: 'SteelWorks GmbH', industry: 'Iron & Steel', region: 'Germany' },
    { id: 'tenant_green_002', name: 'GreenPack Logistics', industry: 'Logistics', region: 'Italy' },
    { id: 'tenant_alum_003', name: 'AluRefine Norway', industry: 'Aluminum', region: 'Norway' },
    { id: 'tenant_fert_004', name: 'Nitrogen Systems', industry: 'Fertilizers', region: 'Netherlands' },
    { id: 'tenant_cem_005', name: 'Concrete Aggregates', industry: 'Cement', region: 'France' },
    { id: 'tenant_elec_006', name: 'Aegean Wind Farm', industry: 'Electricity', region: 'Greece' },
    { id: 'tenant_hydro_007', name: 'H2 HydroGenics', industry: 'Hydrogen', region: 'Germany' },
    { id: 'tenant_cast_008', name: 'Precision Casting', industry: 'Manufacturing', region: 'France' },
    { id: 'tenant_batt_009', name: 'Lithium Logistics', industry: 'Batteries', region: 'China' },
    { id: 'tenant_iron_010', name: 'Nordic Iron Ore', industry: 'Mining', region: 'Sweden' },
    { id: 'tenant_coke_011', name: 'CokeFuel Energy', industry: 'Energy', region: 'Poland' },
    { id: 'tenant_glass_012', name: 'GlassCraft Supply', industry: 'Glass', region: 'Czechia' },
  ];

  currentView = signal('dashboard');
  selectedTenantId = signal('tenant_steel_001');
  isAnalyzing = signal(false);
  aiResponse = signal<string | null>(null);
  librariesLoaded = signal(false);

  private allRecords: EmissionRecord[] = this.generateRecords();

  activeTenantName = computed(() => this.tenantPool.find(t => t.id === this.selectedTenantId())?.name || 'Unknown');
  activeTenantIndustry = computed(() => this.tenantPool.find(t => t.id === this.selectedTenantId())?.industry || 'Unknown');
  records = computed(() => this.allRecords.filter(r => r.tenantId === this.selectedTenantId()));
  totalImpact = computed(() => this.records().reduce((acc, r) => acc + r.carbonGrams / 1000, 0));
  avgConfidence = computed(() => {
    const d = this.records();
    return d.length ? d.reduce((acc, r) => acc + r.confidenceScore, 0) / d.length : 0;
  });

  scope1Total = computed(() =>
    this.records()
      .filter(r => r.scope === 'SCOPE_1')
      .reduce((a, b) => a + b.carbonGrams, 0)
  );
  scope2Total = computed(() =>
    this.records()
      .filter(r => r.scope === 'SCOPE_2')
      .reduce((a, b) => a + b.carbonGrams, 0)
  );
  scope3Total = computed(() =>
    this.records()
      .filter(r => r.scope === 'SCOPE_3')
      .reduce((a, b) => a + b.carbonGrams, 0)
  );

  constructor() {
    // Reset AI response when tenant changes
    effect(() => {
      this.selectedTenantId();
      this.aiResponse.set(null);
      if (this.librariesLoaded() && this.dashboardView) {
        this.dashboardView.refreshCharts();
      }
    });

    // Handle view changes for chart initialization
    effect(() => {
      if (this.librariesLoaded() && this.currentView() === 'dashboard' && this.dashboardView) {
        setTimeout(() => this.dashboardView?.initCharts(), 150);
      }
    });
  }

  async ngAfterViewInit() {
    await this.ensureLibraries();
    this.librariesLoaded.set(true);
    if (this.currentView() === 'dashboard' && this.dashboardView) {
      this.dashboardView.initCharts();
    }
  }

  private generateRecords(): EmissionRecord[] {
    const data: EmissionRecord[] = [];
    let id = 1;
    this.tenantPool.forEach(tenant => {
      data.push({
        id: id++,
        scope: 'SCOPE_1',
        carbonGrams: 500000 + Math.random() * 500000,
        dateRecorded: '2026-01-15',
        source: 'Primary Production Facility',
        confidenceScore: 0.95,
        tenantId: tenant.id,
      });
      data.push({
        id: id++,
        scope: 'SCOPE_2',
        carbonGrams: 200000 + Math.random() * 300000,
        dateRecorded: '2026-01-16',
        source: 'Regional Grid Sync',
        confidenceScore: 0.98,
        tenantId: tenant.id,
      });
      data.push({
        id: id++,
        scope: 'SCOPE_3',
        carbonGrams: 100000 + Math.random() * 900000,
        dateRecorded: '2026-01-18',
        source: 'Upstream Logistics Hub',
        confidenceScore: 0.72 + Math.random() * 0.2,
        tenantId: tenant.id,
      });
    });
    return data;
  }

  private async ensureLibraries() {
    const libs = [
      { name: 'Chart', url: 'https://cdn.jsdelivr.net/npm/chart.js' },
      { name: 'Plotly', url: 'https://cdn.plot.ly/plotly-2.27.0.min.js' },
    ];
    for (const lib of libs) {
      if (!(window as any)[lib.name]) {
        await new Promise(resolve => {
          const s = document.createElement('script');
          s.src = lib.url;
          s.onload = resolve;
          document.head.appendChild(s);
        });
      }
    }
  }

  async generateInsights() {
    this.isAnalyzing.set(true);
    setTimeout(() => {
      this.aiResponse.set(`
        <li><strong>Load Management:</strong> Shift high-intensity operations for ${this.activeTenantName()} to 22:00 UTC to leverage lower night-grid factors ($2,400 monthly saving).</li>
        <li><strong>Verification Strategy:</strong> Tier 2 supplier data in ${this.activeTenantIndustry()} shows 15% variance. Switch to verified logistics to improve audit trust to 96%.</li>
        <li><strong>Infrastructure:</strong> Installation of IoT-MT sensors provides primary evidence for ${this.activeTenantName()} Scope 1 burner emissions.</li>
      `);
      this.isAnalyzing.set(false);
    }, 2500);
  }

  async askAssistant(query: string) {
    if (!query.trim()) return;
    this.aiResponse.set(`<li>EcoAssistant: Analyzing regulatory impact for ${this.activeTenantName()}...</li>`);
    setTimeout(() => {
      this.aiResponse.set(
        `<li><strong>Query:</strong> ${query}</li><li><strong>Expert Response:</strong> 2026 CBAM definitive phase mandates installation-level verification for the ${this.activeTenantIndustry()} sector. Estimates are no longer sufficient.</li>`
      );
    }, 1500);
  }
}
