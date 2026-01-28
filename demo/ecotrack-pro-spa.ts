import { Component, signal, computed, effect, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material M3 Imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';

// External Library Declarations
declare const Chart: any;
declare const Plotly: any;

interface EmissionRecord {
  id: number;
  scope: 'SCOPE_1' | 'SCOPE_2' | 'SCOPE_3';
  carbonGrams: number;
  dateRecorded: string;
  source: string;
  confidenceScore: number;
  tenantId: string;
}

interface TenantMetadata {
  id: string;
  name: string;
  industry: string;
  region: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatRippleModule,
  ],
  template: `
    <div class="m3-theme flex h-screen bg-surface text-on-surface overflow-hidden font-sans">
      <!-- M3 Navigation Drawer (Sidebar) -->
      <aside
        class="w-20 lg:w-72 bg-surface-container-low border-r border-outline-variant flex flex-col justify-between py-10 px-4 transition-all duration-300 z-50"
      >
        <div>
          <div class="px-4 mb-12 flex items-center gap-4">
            <div
              class="w-12 h-12 bg-primary-container text-on-primary-container rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30"
            >
              <mat-icon class="scale-110">eco</mat-icon>
            </div>
            <div class="hidden lg:block">
              <span class="text-xl font-black tracking-tight text-primary uppercase italic">EcoTrack</span>
              <span class="text-xl font-light text-outline ml-1">Pro</span>
            </div>
          </div>

          <nav class="flex flex-col gap-2">
            @for (item of navItems; track item.id) {
            <button
              matRipple
              (click)="currentView.set(item.id)"
              [class.m3-nav-active]="currentView() === item.id"
              class="m3-nav-item flex items-center gap-4 px-4 py-3.5 rounded-full transition-all group"
            >
              <mat-icon
                [class.text-primary]="currentView() === item.id"
                class="text-on-surface-variant group-hover:text-primary transition-colors"
                >{{ item.icon }}</mat-icon
              >
              <span class="text-xs font-bold tracking-widest hidden lg:block uppercase">{{ item.label }}</span>
            </button>
            }
          </nav>
        </div>

        <div class="px-2">
          <div class="m3-glass p-4 rounded-[2rem] flex items-center gap-3 border border-outline-variant">
            <div
              class="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-[10px] uppercase italic shadow-md"
            >
              CFO
            </div>
            <div class="hidden lg:block truncate">
              <div class="text-[11px] font-black text-on-surface truncate tracking-tight uppercase">{{ activeTenantName() }}</div>
              <div class="text-[9px] text-primary font-black tracking-widest uppercase italic">{{ activeTenantIndustry() }}</div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Workspace -->
      <main class="flex-1 flex flex-col overflow-hidden relative">
        <!-- M3 Header -->
        <header class="h-20 m3-glass-header border-b border-outline-variant flex items-center justify-between px-10 z-40">
          <div class="flex items-center gap-8">
            <div class="flex items-center gap-3">
              <h2 class="text-[10px] font-black text-outline uppercase tracking-[0.3em]">Vault</h2>
              <mat-icon class="text-outline-variant scale-75">chevron_right</mat-icon>
              <h2 class="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">{{ currentView() }}</h2>
            </div>

            <mat-form-field appearance="outline" class="m3-select-compact" subscriptSizing="dynamic">
              <mat-select [ngModel]="selectedTenantId()" (ngModelChange)="selectedTenantId.set($event)">
                @for (t of tenantPool; track t.id) {
                <mat-option [value]="t.id">
                  <span class="font-bold">{{ t.name }}</span>
                  <span class="text-[10px] opacity-50 ml-2">({{ t.region }})</span>
                </mat-option>
                }
              </mat-select>
            </mat-form-field>
          </div>

          <div class="flex items-center gap-8">
            <div class="hidden md:flex flex-col items-end">
              <span class="text-[9px] font-black text-outline uppercase tracking-widest mb-1.5">Compute Quota</span>
              <div class="flex items-center gap-3">
                <span class="text-xs font-mono font-black text-on-surface tracking-tighter">$42.50 / $50.00</span>
                <div class="w-20 h-2 bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant shadow-inner">
                  <div class="h-full bg-primary shadow-[0_0_12px_#10b981]" style="width: 85%"></div>
                </div>
              </div>
            </div>
            <button mat-flat-button color="primary" class="m3-rounded-action h-12 px-6 shadow-lg shadow-primary/20">
              <mat-icon class="mr-2">verified</mat-icon>
              GENERATE CBAM
            </button>
          </div>
        </header>

        <!-- Scrolled Content Area -->
        <div class="flex-1 overflow-y-auto p-10 lg:p-14 relative bg-surface scroll-custom">
          @switch (currentView()) { @case ('dashboard') {
          <div class="animate-m3 space-y-12">
            <!-- KPI Display -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="m3-glass p-8 rounded-[2.5rem] border border-outline-variant relative overflow-hidden group">
                <div class="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <mat-icon class="scale-[5] text-primary">analytics</mat-icon>
                </div>
                <div class="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <mat-icon class="scale-75 text-primary">eco</mat-icon> Verified Footprint
                </div>
                <div class="text-6xl font-black text-on-surface tracking-tighter leading-none mb-4">
                  {{ totalImpact() | number: '1.1-1' }}<span class="text-sm font-bold text-outline ml-3">kg CO2e</span>
                </div>
                <div class="flex items-center gap-2 text-[10px] font-bold text-primary italic">
                  <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span> LEDGER LIVE: 2026-Q1
                </div>
              </div>

              <div class="m3-glass p-8 rounded-[2.5rem] border border-outline-variant relative overflow-hidden group">
                <div class="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <mat-icon class="scale-75 text-secondary">verified</mat-icon> Trust Index
                </div>
                <div class="text-6xl font-black text-on-surface tracking-tighter leading-none mb-4">
                  {{ avgConfidence() | percent }}
                </div>
                <div class="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden border border-outline-variant">
                  <div class="h-full bg-secondary shadow-[0_0_10px_#fbbf24]" [style.width]="avgConfidence() * 100 + '%'"></div>
                </div>
              </div>

              <div class="m3-glass p-8 rounded-[2.5rem] border border-outline-variant">
                <div class="text-[10px] font-black text-error uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <mat-icon class="scale-75 text-error">warning</mat-icon> Est. CBAM Tax
                </div>
                <div class="text-6xl font-black text-on-surface tracking-tighter leading-none mb-4 italic">$12.4k</div>
                <div class="text-[10px] font-black text-error uppercase flex items-center gap-2 tracking-widest">PHASE 3 ENFORCEMENT</div>
              </div>
            </div>

            <!-- Visualization Hub -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div class="m3-glass-panel p-10 rounded-[3rem] border border-outline-variant shadow-2xl">
                <div class="flex justify-between items-center mb-10">
                  <h3 class="text-xs font-black text-on-surface uppercase tracking-[0.25em] flex items-center gap-3 italic">
                    <mat-icon class="text-primary">query_stats</mat-icon> Emission Velocity
                  </h3>
                </div>
                <div class="chart-container"><canvas #trendChart></canvas></div>
              </div>
              <div class="m3-glass-panel p-10 rounded-[3rem] border border-outline-variant shadow-2xl">
                <div class="flex justify-between items-center mb-10">
                  <h3 class="text-xs font-black text-on-surface uppercase tracking-[0.25em] flex items-center gap-3 italic">
                    <mat-icon class="text-secondary">donut_small</mat-icon> Factor Breakdown
                  </h3>
                </div>
                <div class="chart-container"><canvas #scopeChart></canvas></div>
              </div>
            </div>
          </div>
          } @case ('ledger') {
          <div class="animate-m3 space-y-10">
            <div class="flex justify-between items-end px-4">
              <div>
                <h2 class="text-4xl font-black tracking-tighter text-on-surface italic uppercase">The Ledger</h2>
                <p class="text-xs font-bold text-outline mt-2 uppercase tracking-[0.2em]">
                  Primary Record Verification // {{ activeTenantName() }}
                </p>
              </div>
              <button mat-stroked-button class="m3-rounded-btn-outline h-12 px-6">
                <mat-icon class="mr-2">history</mat-icon> VIEW AUDIT LOG
              </button>
            </div>

            <div class="m3-glass rounded-[3rem] border border-outline-variant overflow-hidden mx-2 shadow-2xl">
              <table mat-table [dataSource]="records()" class="w-full m3-table">
                <ng-container matColumnDef="scope">
                  <th mat-header-cell *matHeaderCellDef class="px-10 text-[11px] font-black text-outline uppercase tracking-[0.2em]">
                    Class
                  </th>
                  <td mat-cell *matCellDef="let r" class="px-10">
                    <span
                      [class]="getScopeM3Class(r.scope)"
                      class="text-[10px] font-black uppercase px-4 py-1.5 rounded-full border tracking-widest shadow-sm"
                    >
                      {{ r.scope.replace('_', ' ') }}
                    </span>
                  </td>
                </ng-container>

                <ng-container matColumnDef="source">
                  <th mat-header-cell *matHeaderCellDef class="px-10 text-[11px] font-black text-outline uppercase tracking-[0.2em]">
                    Entity
                  </th>
                  <td mat-cell *matCellDef="let r" class="px-10">
                    <div class="text-sm font-black text-on-surface uppercase tracking-tight">{{ r.source }}</div>
                    <div class="text-[10px] text-outline font-bold tracking-widest uppercase mt-1">{{ r.dateRecorded }}</div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="impact">
                  <th
                    mat-header-cell
                    *matHeaderCellDef
                    class="px-10 text-[11px] font-black text-outline uppercase tracking-[0.2em] text-right"
                  >
                    Impact
                  </th>
                  <td mat-cell *matCellDef="let r" class="px-10 text-right font-mono font-black text-primary text-base">
                    {{ r.carbonGrams / 1000 | number: '1.2-2' }} kg
                  </td>
                </ng-container>

                <ng-container matColumnDef="confidence">
                  <th
                    mat-header-cell
                    *matHeaderCellDef
                    class="px-10 text-[11px] font-black text-outline uppercase tracking-[0.2em] text-center"
                  >
                    Audit Trust
                  </th>
                  <td mat-cell *matCellDef="let r" class="px-10 text-center">
                    <div class="flex flex-col items-center gap-2">
                      <div class="w-20 h-1.5 bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant">
                        <div class="h-full bg-primary" [style.width]="r.confidenceScore * 100 + '%'"></div>
                      </div>
                      <span class="text-[10px] font-black text-on-surface-variant">{{ r.confidenceScore | percent }}</span>
                    </div>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns" class="bg-surface-container-high/60"></tr>
                <tr
                  mat-row
                  *matRowDef="let row; columns: displayedColumns"
                  class="hover:bg-primary/10 transition-colors border-b border-outline-variant"
                ></tr>
              </table>
            </div>
          </div>
          } @case ('ai') {
          <div class="animate-m3 max-w-5xl mx-auto space-y-12">
            <div class="p-12 m3-glass rounded-[4rem] border border-primary/20 relative overflow-hidden">
              <div class="absolute -right-20 -top-20 opacity-[0.05] pointer-events-none">
                <mat-icon class="scale-[18] text-primary">auto_awesome</mat-icon>
              </div>

              <div class="flex items-center gap-8 mb-12">
                <div
                  class="w-20 h-20 bg-primary text-on-primary rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary/30"
                >
                  <mat-icon class="scale-[2]">auto_awesome</mat-icon>
                </div>
                <div>
                  <h2 class="text-4xl font-black text-on-surface tracking-tighter uppercase italic">Neural Strategy</h2>
                  <p class="text-[11px] font-black text-primary tracking-[0.3em] uppercase mt-2">Compliance Optimization v4</p>
                </div>
              </div>

              <div
                class="bg-surface-container-highest/40 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-outline-variant min-h-[250px] flex flex-col justify-center"
              >
                @if (isAnalyzing()) {
                <div class="flex flex-col items-center gap-8 py-10">
                  <div class="w-14 h-14 border-[6px] border-primary/10 border-t-primary rounded-full animate-spin"></div>
                  <div class="text-[11px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">
                    Running Sector Simulation...
                  </div>
                </div>
                } @else if (aiResponse()) {
                <div
                  class="m3-ai-output text-on-surface-variant leading-relaxed space-y-6 text-lg font-medium"
                  [innerHTML]="aiResponse()"
                ></div>
                } @else {
                <div class="text-center opacity-30">
                  <mat-icon class="mb-4 scale-[2] text-secondary">psychology</mat-icon>
                  <p class="text-xs font-black uppercase tracking-[0.3em] text-outline">Neural bridge active. Select Execute.</p>
                </div>
                }
              </div>

              <div class="flex gap-4 mt-10">
                <button
                  mat-flat-button
                  color="primary"
                  (click)="generateInsights()"
                  [disabled]="isAnalyzing()"
                  class="flex-1 h-16 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs"
                >
                  Run Neural Optimization
                </button>
                <button mat-stroked-button class="h-16 w-16 rounded-[1.5rem] border-outline-variant text-primary shadow-sm">
                  <mat-icon>history</mat-icon>
                </button>
              </div>
            </div>

            <!-- Chat Integration -->
            <div class="m3-glass p-10 rounded-[3rem] border border-outline-variant">
              <div class="flex items-center gap-6 mb-8">
                <div
                  class="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-md"
                >
                  <mat-icon>chat</mat-icon>
                </div>
                <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface">EcoAssistant v3</h3>
              </div>
              <mat-form-field appearance="outline" class="w-full m3-chat-field">
                <mat-label class="font-bold tracking-wide">Query regulatory impact...</mat-label>
                <input
                  matInput
                  [(ngModel)]="chatQuery"
                  (keyup.enter)="askAssistant()"
                  placeholder="e.g. how does CBAM affect {{ activeTenantIndustry() }} exports?"
                />
                <button matSuffix mat-icon-button (click)="askAssistant()" class="text-primary mr-2">
                  <mat-icon>send</mat-icon>
                </button>
              </mat-form-field>
            </div>

            <div class="m3-glass p-10 rounded-[3rem] border border-outline-variant">
              <div class="flex justify-between items-center mb-10">
                <h3 class="text-xs font-black text-on-surface uppercase tracking-[0.25em] flex items-center gap-3 italic">
                  <mat-icon class="text-secondary">analytics</mat-icon> Latency Analysis (ms)
                </h3>
              </div>
              <div id="latencyPlot" class="w-full h-[320px]"></div>
            </div>
          </div>
          } }
        </div>
      </main>

      <!-- Global Observability FAB -->
      <div
        class="fixed bottom-10 right-10 flex items-center gap-5 m3-glass border border-outline-variant shadow-2xl px-6 py-4 rounded-[2rem] z-50"
      >
        <div class="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_12px_#10b981]"></div>
        <div class="flex flex-col">
          <span class="text-[10px] font-black text-primary uppercase tracking-[0.25em]">Telemetry Stream</span>
          <span class="text-[11px] font-bold text-secondary font-mono">Trace: 2026-v4-9204</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        --mdc-typography-font-family: 'Inter', sans-serif;
      }

      .m3-theme {
        --primary: #10b981;
        --on-primary: #022c22;
        --primary-container: #064e3b;
        --on-primary-container: #a7f3d0;
        --secondary: #fbbf24;
        --on-secondary: #451a03;
        --secondary-container: #78350f;
        --on-secondary-container: #fef3c7;
        --tertiary: #fbbf24;
        --on-tertiary: #451a03;
        --tertiary-container: #451a03;
        --on-tertiary-container: #fef3c7;
        --error: #f2b8b5;
        --on-error: #601410;
        --surface: #0a0e0a;
        --on-surface: #e1e3df;
        --on-surface-variant: #94a3b8;
        --surface-container-low: #131b13;
        --surface-container: #1b241b;
        --surface-container-high: #242d24;
        --surface-container-highest: #2d362d;
        --outline: #6b7280;
        --outline-variant: #374151;
      }

      .m3-glass {
        background: rgba(30, 40, 30, 0.4) !important;
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(16, 185, 129, 0.1) !important;
      }

      .m3-glass-panel {
        background: rgba(45, 54, 45, 0.2);
        backdrop-filter: blur(32px);
        -webkit-backdrop-filter: blur(32px);
      }

      .m3-glass-header {
        background: rgba(10, 14, 10, 0.7);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
      }

      .m3-nav-item {
        color: var(--on-surface-variant);
        margin: 0 4px;
      }
      .m3-nav-active {
        background: var(--primary-container) !important;
        color: var(--on-primary-container) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      .m3-select-compact {
        width: 240px;
      }
      ::ng-deep .m3-select-compact .mat-mdc-form-field-flex {
        background: var(--surface-container-highest) !important;
        border-radius: 12px !important;
        padding: 0 16px !important;
      }

      .m3-table {
        background: transparent !important;
      }
      ::ng-deep .mat-mdc-header-row {
        height: 72px !important;
        background: rgba(255, 255, 255, 0.02) !important;
      }
      ::ng-deep .mat-mdc-row {
        height: 96px !important;
        border-bottom: 1px solid var(--outline-variant) !important;
      }

      .m3-ai-output ::ng-deep li {
        list-style: none;
        padding-left: 36px;
        position: relative;
        margin-bottom: 24px;
        font-weight: 500;
      }
      .m3-ai-output ::ng-deep li::before {
        content: 'auto_awesome';
        font-family: 'Material Icons';
        position: absolute;
        left: 0;
        top: 2px;
        color: var(--primary);
        font-size: 20px;
      }

      .m3-chat-field ::ng-deep .mat-mdc-form-field-flex {
        border-radius: 24px !important;
        background: var(--surface-container-highest) !important;
      }

      .animate-m3 {
        animation: m3In 0.8s cubic-bezier(0.1, 1, 0.1, 1);
      }
      @keyframes m3In {
        from {
          opacity: 0;
          transform: translateY(30px) scale(0.98);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .scroll-custom::-webkit-scrollbar {
        width: 4px;
      }
      .scroll-custom::-webkit-scrollbar-thumb {
        background: var(--primary-container);
        border-radius: 10px;
      }

      .chart-container {
        position: relative;
        height: 320px;
        width: 100%;
      }

      .m3-rounded-action {
        border-radius: 16px !important;
        font-weight: 900 !important;
        letter-spacing: 1px !important;
      }
      .m3-rounded-btn-outline {
        border-radius: 100px !important;
        font-weight: 700 !important;
        color: var(--primary) !important;
        border-color: var(--outline-variant) !important;
      }
    `,
  ],
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('trendChart') trendCanvas?: ElementRef;
  @ViewChild('scopeChart') scopeCanvas?: ElementRef;

  private trendChartInstance: any;
  private scopeChartInstance: any;

  navItems = [
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
  chatQuery = '';
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

  displayedColumns = ['scope', 'source', 'impact', 'confidence'];

  constructor() {
    effect(() => {
      this.selectedTenantId();
      this.aiResponse.set(null);
      if (this.librariesLoaded()) {
        this.refreshCharts();
        this.initLatencyPlot();
      }
    });

    effect(() => {
      if (this.librariesLoaded()) {
        if (this.currentView() === 'dashboard') {
          setTimeout(() => this.initCharts(), 150);
        } else if (this.currentView() === 'ai') {
          setTimeout(() => this.initLatencyPlot(), 150);
        }
      }
    });
  }

  async ngAfterViewInit() {
    await this.ensureLibraries();
    this.librariesLoaded.set(true);
    // Initial render depends on the current view
    if (this.currentView() === 'dashboard') {
      this.initCharts();
    } else if (this.currentView() === 'ai') {
      this.initLatencyPlot();
    }
  }

  ngOnDestroy() {
    if (this.trendChartInstance) this.trendChartInstance.destroy();
    if (this.scopeChartInstance) this.scopeChartInstance.destroy();
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

  private initCharts() {
    if (!this.trendCanvas || !this.scopeCanvas || typeof Chart === 'undefined') return;
    if (this.trendChartInstance) this.trendChartInstance.destroy();
    if (this.scopeChartInstance) this.scopeChartInstance.destroy();

    this.trendChartInstance = new Chart(this.trendCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Emissions',
            data: [1200, 1150, 1250, 1100, 1050, this.totalImpact()],
            borderColor: '#10b981',
            borderWidth: 5,
            tension: 0.45,
            fill: true,
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { display: false }, x: { grid: { display: false }, ticks: { color: '#6b7280', font: { weight: 'bold' } } } },
        plugins: { legend: { display: false } },
      },
    });

    this.scopeChartInstance = new Chart(this.scopeCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Scope 1', 'Scope 2', 'Scope 3'],
        datasets: [
          {
            data: [
              this.records()
                .filter(r => r.scope === 'SCOPE_1')
                .reduce((a, b) => a + b.carbonGrams, 0),
              this.records()
                .filter(r => r.scope === 'SCOPE_2')
                .reduce((a, b) => a + b.carbonGrams, 0),
              this.records()
                .filter(r => r.scope === 'SCOPE_3')
                .reduce((a, b) => a + b.carbonGrams, 0),
            ],
            backgroundColor: ['#fbbf24', '#10b981', '#34d399'],
            borderWidth: 0,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '82%', plugins: { legend: { display: false } } },
    });
  }

  private initLatencyPlot() {
    const element = document.getElementById('latencyPlot');
    if (!element || typeof Plotly === 'undefined') return;

    const tF = {
      x: Array.from({ length: 20 }, (_, i) => i),
      y: Array.from({ length: 20 }, () => 180 + Math.random() * 60),
      mode: 'markers',
      name: 'Flash',
      marker: { color: '#10b981', size: 12 },
    };
    const tP = {
      x: Array.from({ length: 20 }, (_, i) => i),
      y: Array.from({ length: 20 }, () => 1100 + Math.random() * 250),
      mode: 'markers',
      name: 'Pro',
      marker: { color: '#fbbf24', size: 12 },
    };
    const layout = {
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: { color: '#94a3b8', size: 10 },
      margin: { t: 30, l: 50, r: 20, b: 50 },
      legend: { orientation: 'h', y: 1.15 },
      xaxis: { gridcolor: 'rgba(255,255,255,0.05)', zeroline: false },
      yaxis: { gridcolor: 'rgba(255,255,255,0.05)', zeroline: false, title: 'Latency (ms)' },
    };
    Plotly.newPlot('latencyPlot', [tF, tP], layout, { displayModeBar: false, responsive: true });
  }

  private refreshCharts() {
    if (this.currentView() === 'dashboard') {
      if (this.trendChartInstance) {
        this.trendChartInstance.data.datasets[0].data[5] = this.totalImpact();
        this.trendChartInstance.update();
      }
      if (this.scopeChartInstance) {
        this.scopeChartInstance.data.datasets[0].data = [
          this.records()
            .filter(r => r.scope === 'SCOPE_1')
            .reduce((a, b) => a + b.carbonGrams, 0),
          this.records()
            .filter(r => r.scope === 'SCOPE_2')
            .reduce((a, b) => a + b.carbonGrams, 0),
          this.records()
            .filter(r => r.scope === 'SCOPE_3')
            .reduce((a, b) => a + b.carbonGrams, 0),
        ];
        this.scopeChartInstance.update();
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

  async askAssistant() {
    if (!this.chatQuery.trim()) return;
    const q = this.chatQuery;
    this.chatQuery = '';
    this.aiResponse.set(`<li>EcoAssistant: Analyzing regulatory impact for ${this.activeTenantName()}...</li>`);
    setTimeout(() => {
      this.aiResponse.set(
        `<li><strong>Query:</strong> ${q}</li><li><strong>Expert Response:</strong> 2026 CBAM definitive phase mandates installation-level verification for the ${this.activeTenantIndustry()} sector. Estimates are no longer sufficient.</li>`,
      );
    }, 1500);
  }

  getScopeM3Class(scope: string) {
    if (scope === 'SCOPE_1') return 'text-secondary border-secondary/30 bg-secondary/10';
    if (scope === 'SCOPE_2') return 'text-primary border-primary/30 bg-primary/10';
    return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
  }
}
