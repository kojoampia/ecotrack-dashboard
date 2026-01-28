import { Component, Injectable, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * Interface for Emission Records
 */
export interface EmissionRecord {
  id: number;
  scope: 'SCOPE_1' | 'SCOPE_2' | 'SCOPE_3';
  carbonGrams: number;
  dateRecorded: string;
  source: string;
  confidenceScore: number;
  tenantId: string;
}

/**
 * Main Application Component
 * Named 'App' with selector 'app-root' as required for the environment.
 */
@Component({
  selector: 'app-root',
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-50 p-8 font-sans">
      <div class="max-w-4xl mx-auto">
        <header class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900">EcoTrack Pro <span class="text-emerald-600">Data Hub</span></h1>
          <p class="text-slate-500">Service integration and data simulation preview.</p>
        </header>

        <!-- Tenant Switcher -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
          <h2 class="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Select Tenant Context</h2>
          <div class="flex gap-4">
            <button
              (click)="setTenant('tenant_steel_001')"
              [class]="activeTenant() === 'tenant_steel_001' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'"
              class="px-4 py-2 rounded-lg font-medium transition-colors"
            >
              SteelWorks GmbH
            </button>
            <button
              (click)="setTenant('tenant_green_002')"
              [class]="activeTenant() === 'tenant_green_002' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'"
              class="px-4 py-2 rounded-lg font-medium transition-colors"
            >
              GreenPack Logistics
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Records List -->
          <div class="md:col-span-2 space-y-4">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-bold text-slate-800">Emission Records</h3>
                <span *ngIf="loading()" class="text-xs text-emerald-600 animate-pulse font-bold uppercase">Fetching...</span>
              </div>

              <div class="space-y-3">
                <div
                  *ngFor="let record of currentRecords()"
                  class="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div>
                    <div class="text-sm font-bold text-slate-800">{{ record.source }}</div>
                    <div class="text-xs text-slate-400">{{ record.dateRecorded }} • {{ record.scope }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-mono font-bold text-emerald-700">{{ record.carbonGrams / 1000 | number: '1.1-2' }} kg</div>
                    <div class="text-[10px] text-slate-400">Confidence: {{ record.confidenceScore * 100 }}%</div>
                  </div>
                </div>
                <div *ngIf="currentRecords().length === 0 && !loading()" class="text-center py-8 text-slate-400 italic">
                  No records found for this tenant.
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="space-y-6">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 class="font-bold text-slate-800 mb-4">Calculator Simulation</h3>
              <div class="space-y-3">
                <div>
                  <label class="text-xs font-bold text-slate-400 uppercase">Input (kWh)</label>
                  <input
                    #kwhInput
                    type="number"
                    value="1000"
                    class="w-full mt-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  />
                </div>
                <button
                  (click)="calculate(kwhInput.value)"
                  class="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
                >
                  Calculate Projection
                </button>
                <div *ngIf="projection() !== null" class="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                  <div class="text-xs text-emerald-600 font-bold uppercase">Result</div>
                  <div class="text-xl font-black text-emerald-700">{{ projection() | number: '1.2-2' }} kg CO2e</div>
                </div>
              </div>
            </div>

            <div class="bg-emerald-900 p-6 rounded-2xl shadow-lg text-white">
              <h3 class="font-bold mb-2">Audit Report</h3>
              <p class="text-xs text-emerald-200 mb-4">Generate a verified Q1 compliance report for this tenant.</p>
              <button
                (click)="generateReport()"
                [disabled]="reportLoading()"
                class="w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 py-2 rounded-lg text-sm font-black transition-colors disabled:opacity-50"
              >
                {{ reportLoading() ? 'GENERATING...' : 'GENERATE PDF' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `,
  ],
})
export class App implements OnInit {
  private dataService = inject(MockDataService);

  activeTenant = signal('tenant_steel_001');
  currentRecords = signal<EmissionRecord[]>([]);
  loading = signal(false);
  reportLoading = signal(false);
  projection = signal<number | null>(null);

  ngOnInit() {
    this.fetchRecords();
  }

  setTenant(id: string) {
    this.activeTenant.set(id);
    this.fetchRecords();
    this.projection.set(null);
  }

  fetchRecords() {
    this.loading.set(true);
    this.dataService.getRecordsByTenant(this.activeTenant()).subscribe({
      next: data => {
        this.currentRecords.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  calculate(val: string) {
    const kwh = parseFloat(val);
    if (isNaN(kwh)) return;
    this.dataService.calculateProjection(kwh, 'EU').subscribe(res => {
      this.projection.set(res);
    });
  }

  generateReport() {
    this.reportLoading.set(true);
    this.dataService.generateDemoReport(this.activeTenant()).subscribe({
      next: res => {
        this.reportLoading.set(false);
        console.log('Report generated:', res.url);
      },
      error: () => this.reportLoading.set(false),
    });
  }
}

/**
 * Data Service handling simulated API calls
 */
@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private records: EmissionRecord[] = [
    {
      id: 1,
      scope: 'SCOPE_2',
      carbonGrams: 1250500,
      dateRecorded: '2026-01-15',
      source: 'Main Factory Grid Meter',
      confidenceScore: 0.98,
      tenantId: 'tenant_steel_001',
    },
    {
      id: 2,
      scope: 'SCOPE_1',
      carbonGrams: 450000,
      dateRecorded: '2026-01-16',
      source: 'On-site Diesel Generator',
      confidenceScore: 0.92,
      tenantId: 'tenant_steel_001',
    },
    {
      id: 3,
      scope: 'SCOPE_3',
      carbonGrams: 890000,
      dateRecorded: '2026-01-18',
      source: 'Supply Chain - Global Steel Scraps',
      confidenceScore: 0.65,
      tenantId: 'tenant_steel_001',
    },
    {
      id: 4,
      scope: 'SCOPE_3',
      carbonGrams: 120000,
      dateRecorded: '2026-01-20',
      source: 'Last-mile Delivery - EcoTrucking',
      confidenceScore: 0.88,
      tenantId: 'tenant_green_002',
    },
    {
      id: 5,
      scope: 'SCOPE_2',
      carbonGrams: 45000,
      dateRecorded: '2026-01-21',
      source: 'Office HQ Electricity',
      confidenceScore: 0.95,
      tenantId: 'tenant_green_002',
    },
  ];

  getRecordsByTenant(tenantId: string): Observable<EmissionRecord[]> {
    const filtered = this.records.filter(r => r.tenantId === tenantId);
    return of(filtered).pipe(delay(800));
  }

  calculateProjection(kwh: number, region: string): Observable<number> {
    const factor = region === 'EU' ? 0.125 : 0.45;
    return of(kwh * factor).pipe(delay(500));
  }

  generateDemoReport(tenantId: string): Observable<{ url: string }> {
    return of({ url: `https://api.ecotrack.pro/reports/demo/${tenantId}_Q1_2026.pdf` }).pipe(delay(1500));
  }
}
