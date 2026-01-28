import { Component, signal, computed, inject, ChangeDetectionStrategy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of, from } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

interface EmissionRecord {
id: number;
scope: 'SCOPE_1' | 'SCOPE_2' | 'SCOPE_3';
carbonGrams: number;
dateRecorded: string;
source: string;
confidenceScore: number;
tenantId: string;
}

interface Tenant {
id: string;
name: string;
}
/\*

- Start Tenant Home Dashboard
- \*/
  @Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
  <div class="max-w-7xl mx-auto">
  <!-- Header -->
  <header class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
  <div>
  <h1 class="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
  <span class="bg-emerald-600 text-white p-2 rounded-lg"><i class="fas fa-leaf"></i></span>
  EcoTrack Pro <span class="text-sm font-medium text-slate-400">v2026.1</span>
  </h1>
  <p class="text-slate-500 text-sm mt-1">Enterprise Carbon Ledger & Compliance Hub</p>
  </div>

            <div class="flex flex-wrap gap-3 items-center">
              <div class="flex flex-col">
                <label class="text-[10px] font-bold text-slate-400 uppercase mb-1 ml-1">Current Organization</label>
                <select
                  [ngModel]="selectedTenantId()"
                  (ngModelChange)="selectedTenantId.set($event)"
                  class="bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer">
                  @for (tenant of tenants; track tenant.id) {
                    <option [value]="tenant.id">{{ tenant.name }}</option>
                  }
                </select>
              </div>
              <button (click)="onExport()" class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-200">
                <i class="fas fa-file-export"></i> CBAM EXPORT
              </button>
            </div>
          </header>

          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Left Column: Stats & Table -->
            <div class="lg:col-span-3 space-y-6">

              <!-- Stats Overview -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
                  <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <i class="fas fa-cloud text-6xl"></i>
                  </div>
                  <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Footprint</p>
                  <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-black text-slate-900">{{ totalEmissions() | number }}</span>
                    <span class="text-slate-400 text-sm font-medium">kg CO2e</span>
                  </div>
                  <div class="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit">
                    <i class="fas fa-arrow-down"></i> 4.2% vs Last Month
                  </div>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Data Confidence</p>
                  <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-black text-emerald-600">{{ avgConfidence() | percent }}</span>
                    <span class="text-slate-400 text-sm font-medium">Target >90%</span>
                  </div>
                  <div class="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div class="bg-emerald-500 h-full transition-all duration-1000" [style.width]="avgConfidence() | percent"></div>
                  </div>
                </div>

                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                  <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Audit Status</p>
                  <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-black text-slate-900">{{ auditReadyCount() }}</span>
                    <span class="text-slate-400 text-sm font-medium">Verified Pings</span>
                  </div>
                  <div class="mt-4 flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md w-fit">
                    <i class="fas fa-shield-check"></i> Standard ISO 14064
                  </div>
                </div>
              </div>

              <!-- Ledger Table -->
              <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                  <h2 class="font-bold text-slate-800 flex items-center gap-2">
                    <i class="fas fa-list-check text-slate-400"></i> Active Compliance Ledger
                  </h2>
                  <div class="flex items-center gap-2">
                     <span class="animate-pulse w-2 h-2 rounded-full bg-emerald-500"></span>
                     <span class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">IoT Live Sync Active</span>
                  </div>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-left">
                    <thead class="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                      <tr>
                        <th class="px-6 py-4">Classification</th>
                        <th class="px-6 py-4">Evidence Source</th>
                        <th class="px-6 py-4 text-right">Impact (kg)</th>
                        <th class="px-6 py-4 text-center">Confidence</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                      @for (record of records(); track record.id) {
                        <tr class="hover:bg-slate-50 transition-all group">
                          <td class="px-6 py-4">
                            <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter" [class]="getScopeClass(record.scope)">
                              {{ record.scope.replace('_', ' ') }}
                            </span>
                          </td>
                          <td class="px-6 py-4">
                            <div class="text-sm font-semibold text-slate-700">{{ record.source }}</div>
                            <div class="text-[10px] text-slate-400">{{ record.dateRecorded }} • UID: #{{ record.id }}</div>
                          </td>
                          <td class="px-6 py-4 text-right font-mono font-bold text-slate-600">
                            {{ (record.carbonGrams / 1000) | number }}
                          </td>
                          <td class="px-6 py-4 text-center">
                            <div class="flex flex-col items-center gap-1">
                              <div class="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div class="bg-emerald-500 h-full" [style.width]="(record.confidenceScore * 100) + '%'"></div>
                              </div>
                              <span class="text-[10px] font-bold text-slate-400">{{ record.confidenceScore | percent }}</span>
                            </div>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- ✨ AI Compliance Insights -->
              <div class="bg-emerald-950 rounded-2xl p-6 text-white shadow-xl shadow-emerald-900/20 relative overflow-hidden">
                <div class="absolute -right-8 -top-8 text-emerald-900/40 text-9xl transform rotate-12">
                  <i class="fas fa-sparkles"></i>
                </div>
                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-bold flex items-center gap-2">
                      <i class="fas fa-brain text-emerald-400"></i> AI Compliance Intelligence
                    </h3>
                    <button (click)="generateAIInsights()" [disabled]="isGeneratingInsights()"
                      class="text-[10px] font-black uppercase tracking-widest bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/50 px-4 py-2 rounded-xl transition-all disabled:opacity-50">
                      @if (isGeneratingInsights()) { <i class="fas fa-spinner animate-spin"></i> ANALYZING... } @else { REFRESH INSIGHTS }
                    </button>
                  </div>

                  <div class="min-h-[120px] flex flex-col justify-center">
                    @if (aiInsights()) {
                      <div class="prose prose-invert prose-sm max-w-none" [innerHTML]="aiInsights()"></div>
                    } @else {
                      <div class="text-center text-emerald-400/60 py-4">
                        <p class="text-sm font-medium italic">Click "Refresh Insights" to generate real-time reduction strategies based on current ledger data.</p>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: AI Assistant & Tools -->
            <div class="space-y-6">
              <!-- EcoAssistant -->
              <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 border-t-4 border-t-blue-500">
                <h3 class="font-black text-slate-800 text-sm mb-2 flex items-center gap-2 uppercase tracking-tight">
                  <i class="fas fa-robot text-blue-500"></i> EcoAssistant AI
                </h3>
                <p class="text-xs text-slate-400 mb-4 leading-relaxed font-medium">Your 2026 Regulatory Knowledge Base. Ask anything about CBAM, GHG, or SEC climate rules.</p>

                <div class="space-y-4">
                  <div class="relative">
                    <input type="text" [(ngModel)]="assistantQuery" (keyup.enter)="askAssistant()" placeholder="How does CBAM affect Scope 3?"
                      class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pr-10 outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium transition-all">
                    <button (click)="askAssistant()" [disabled]="isAsking()" class="absolute right-3 top-3.5 text-blue-500 hover:text-blue-700 disabled:opacity-30">
                      @if (isAsking()) { <i class="fas fa-spinner animate-spin"></i> } @else { <i class="fas fa-paper-plane"></i> }
                    </button>
                  </div>

                  @if (assistantResponse()) {
                    <div class="bg-blue-50 p-4 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p class="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Response</p>
                      <p class="text-xs text-slate-700 leading-relaxed font-medium">{{ assistantResponse() }}</p>
                    </div>
                  }
                </div>
              </div>

              <!-- Quick Calc -->
              <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 class="font-black text-slate-800 text-sm mb-4 uppercase tracking-tight">Quick Calculator</h3>
                <div class="space-y-4">
                  <div>
                    <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Activity (kWh)</label>
                    <input type="number" [(ngModel)]="calcKwh" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold outline-none focus:ring-2 focus:ring-slate-800">
                  </div>
                  <button (click)="runCalc()" class="w-full bg-slate-900 text-white font-black text-xs uppercase tracking-widest py-3 rounded-xl hover:bg-black transition-all">Project Impact</button>

                  @if (calcResult()) {
                    <div class="p-4 bg-slate-50 rounded-xl text-center border border-slate-100 animate-in zoom-in duration-200">
                      <p class="text-[10px] font-bold text-slate-400 uppercase">Est. CO2e</p>
                      <p class="text-xl font-black text-slate-900">{{ calcResult() }} kg</p>
                    </div>
                  }
                </div>
              </div>

              <!-- ERP Status -->
              <div class="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
                <div class="flex items-center gap-3 mb-4">
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-xs font-black uppercase tracking-widest">Connectors</span>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-slate-400 font-bold uppercase tracking-tight">Oracle NetSuite</span>
                    <span class="text-emerald-400 font-black">ACTIVE</span>
                  </div>
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-slate-400 font-bold uppercase tracking-tight">SAP S/4HANA</span>
                    <span class="text-emerald-400 font-black">ACTIVE</span>
                  </div>
                  <div class="pt-2 border-t border-slate-800 mt-2">
                    <button class="w-full py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Manage Credentials</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Toast -->
      <div [class.translate-y-0]="showToast()" [class.translate-y-24]="!showToast()"
        class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl transition-transform duration-500 z-50 flex items-center gap-4">
        <i class="fas fa-check-circle text-emerald-400 text-xl"></i>
        <div>
          <p class="text-sm font-black uppercase tracking-widest">Action Complete</p>
          <p class="text-xs text-slate-400 font-medium">{{ toastMsg() }}</p>
        </div>
      </div>

  `,
  styles: [`
  :host { display: block; }
  .animate-in { animation: animateIn 0.3s ease-out; }
  @keyframes animateIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
  })
  /\*\*

- End Tenant Home Dashboard
  \*/

export class App {
private readonly apiKey = "";

// State
tenants: Tenant[] = [
{ id: 'tenant_steel_001', name: 'SteelWorks GmbH' },
{ id: 'tenant_green_002', name: 'GreenPack Logistics' }
];

selectedTenantId = signal<string>('tenant_steel_001');
isGeneratingInsights = signal(false);
aiInsights = signal<string | null>(null);

assistantQuery = '';
assistantResponse = signal<string | null>(null);
isAsking = signal(false);

calcKwh = 5000;
calcResult = signal<string | null>(null);

showToast = signal(false);
toastMsg = signal('');

// Simulated DB
private allRecords: EmissionRecord[] = [
{ id: 1, scope: 'SCOPE_2', carbonGrams: 1250500, dateRecorded: '2026-01-15', source: 'Main Factory Grid Meter', confidenceScore: 0.98, tenantId: 'tenant_steel_001' },
{ id: 2, scope: 'SCOPE_1', carbonGrams: 450000, dateRecorded: '2026-01-16', source: 'On-site Diesel Generator', confidenceScore: 0.92, tenantId: 'tenant_steel_001' },
{ id: 3, scope: 'SCOPE_3', carbonGrams: 890000, dateRecorded: '2026-01-18', source: 'Supply Chain - Global Steel Scraps', confidenceScore: 0.65, tenantId: 'tenant_steel_001' },
{ id: 4, scope: 'SCOPE_3', carbonGrams: 120000, dateRecorded: '2026-01-20', source: 'Last-mile Delivery - EcoTrucking', confidenceScore: 0.88, tenantId: 'tenant_green_002' },
{ id: 5, scope: 'SCOPE_2', carbonGrams: 45000, dateRecorded: '2026-01-21', source: 'Office HQ Electricity', confidenceScore: 0.95, tenantId: 'tenant_green_002' }
];

// Derived State
records = computed(() => this.allRecords.filter(r => r.tenantId === this.selectedTenantId()));

totalEmissions = computed(() =>
this.records().reduce((acc, r) => acc + (r.carbonGrams / 1000), 0)
);

avgConfidence = computed(() => {
const data = this.records();
if (data.length === 0) return 0;
return data.reduce((acc, r) => acc + r.confidenceScore, 0) / data.length;
});

auditReadyCount = computed(() => this.records().filter(r => r.confidenceScore > 0.9).length);

constructor() {
// Reset insights when tenant changes
effect(() => {
this.selectedTenantId();
this.aiInsights.set(null);
this.assistantResponse.set(null);
}, { allowSignalWrites: true });
}

// --- Actions ---

async callGemini(prompt: string, system: string): Promise<string> {
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${this.apiKey}`;
const payload = {
contents: [{ parts: [{ text: prompt }] }],
systemInstruction: { parts: [{ text: system }] }
};

    let retryDelay = 1000;
    for (let i = 0; i < 5; i++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const result = await response.json();
          return result.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
        }

        if (response.status === 429 || response.status >= 500) {
          await new Promise(r => setTimeout(r, retryDelay));
          retryDelay *= 2;
          continue;
        }
        break;
      } catch (e) {
        await new Promise(r => setTimeout(r, retryDelay));
        retryDelay *= 2;
      }
    }
    return "The AI consultant is currently unavailable. Please verify your connection.";

}

async generateAIInsights() {
this.isGeneratingInsights.set(true);
const tenantName = this.tenants.find(t => t.id === this.selectedTenantId())?.name || "Company";
const context = JSON.stringify(this.records());

    const prompt = `Review these carbon records for ${tenantName}: ${context}.
    Provide 3 high-impact reduction strategies in bullet points using clean HTML.
    Focus on Scopes with the highest footprint. Keep it short and professional.`;

    try {
      const response = await this.callGemini(prompt, "You are an AI Sustainability Architect. Return only HTML bullet points.");
      this.aiInsights.set(response);
    } finally {
      this.isGeneratingInsights.set(false);
    }

}

async askAssistant() {
if (!this.assistantQuery.trim()) return;
this.isAsking.set(true);

    try {
      const response = await this.callGemini(this.assistantQuery, "You are EcoAssistant, an expert in 2026 carbon rules and CBAM. Keep answers under 150 characters.");
      this.assistantResponse.set(response);
      this.assistantQuery = '';
    } finally {
      this.isAsking.set(false);
    }

}

runCalc() {
this.calcResult.set((this.calcKwh \* 0.125).toFixed(2));
}

onExport() {
this.triggerToast("CBAM XML generated and archived for audit.");
}

triggerToast(msg: string) {
this.toastMsg.set(msg);
this.showToast.set(true);
setTimeout(() => this.showToast.set(false), 3000);
}

getScopeClass(scope: string) {
if (scope === 'SCOPE_1') return 'bg-blue-100 text-blue-700';
if (scope === 'SCOPE_2') return 'bg-emerald-100 text-emerald-700';
return 'bg-amber-100 text-amber-700';
}
}
