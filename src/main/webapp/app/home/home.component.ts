import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import SharedModule from 'app/shared/shared.module';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

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

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export default class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;

  // State
  tenants: Tenant[] = [
    { id: 'tenant_steel_001', name: 'SteelWorks GmbH' },
    { id: 'tenant_green_002', name: 'GreenPack Logistics' },
  ];

  selectedTenantId = signal<string>('tenant_steel_001');
  isGeneratingInsights = signal(false);
  aiInsights = signal<any[] | null>(null);

  assistantQuery = '';
  assistantResponse = signal<string | null>(null);
  isAsking = signal(false);

  calcKwh = 5000;
  calcResult = signal<string | null>(null);

  showToast = signal(false);
  toastMsg = signal('');

  // Simulated DB
  private allRecords: EmissionRecord[] = [
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

  // Derived State
  records = computed(() => this.allRecords.filter(r => r.tenantId === this.selectedTenantId()));

  totalEmissions = computed(() => this.records().reduce((acc, r) => acc + r.carbonGrams / 1000, 0));

  avgConfidence = computed(() => {
    const data = this.records();
    if (data.length === 0) return 0;
    return data.reduce((acc, r) => acc + r.confidenceScore, 0) / data.length;
  });

  auditReadyCount = computed(() => this.records().filter(r => r.confidenceScore > 0.9).length);

  // Table columns for mat-table
  displayedColumns: string[] = ['classification', 'evidence', 'impact', 'confidence'];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // --- Actions ---

  async generateAIInsights() {
    this.isGeneratingInsights.set(true);
    const tenantName = this.tenants.find(t => t.id === this.selectedTenantId())?.name || 'Company';

    // Simulate AI insights generation
    setTimeout(() => {
      const insights = [
        {
          title: 'Scope 3 Optimization',
          description: 'Switch 40% of supply chain to low-carbon steel suppliers, potential 25% reduction',
        },
        {
          title: 'Energy Efficiency',
          description: 'Implement smart grid monitoring to reduce Scope 2 emissions by 15%',
        },
        {
          title: 'Process Improvement',
          description: 'Upgrade diesel generators with cleaner alternatives for 30% Scope 1 reduction',
        },
      ];
      this.aiInsights.set(insights);
      this.isGeneratingInsights.set(false);
    }, 2000);
  }

  async askAssistant() {
    if (!this.assistantQuery.trim()) return;
    this.isAsking.set(true);

    // Simulate assistant response
    setTimeout(() => {
      const responses = [
        'CBAM requires annual reporting by May 31st. Scope 3 emissions must include supply chain data.',
        'Under SEC climate rules, you need to disclose Scope 1 & 2 emissions if above 25,000 metric tons CO2e.',
        'GHG Protocol recommends using location-based method for Scope 2 calculations.',
      ];
      this.assistantResponse.set(responses[Math.floor(Math.random() * responses.length)]);
      this.assistantQuery = '';
      this.isAsking.set(false);
    }, 1500);
  }

  runCalc() {
    this.calcResult.set((this.calcKwh * 0.125).toFixed(2));
  }

  onExport() {
    this.triggerToast('CBAM XML generated and archived for audit.');
  }

  triggerToast(msg: string) {
    this.toastMsg.set(msg);
    this.showToast.set(true);
    setTimeout(() => this.showToast.set(false), 3000);
  }

  getScopeClass(scope: string): string {
    if (scope === 'SCOPE_1') return 'scope-1';
    if (scope === 'SCOPE_2') return 'scope-2';
    return 'scope-3';
  }

  trackByTenantId(index: number, tenant: any): string {
    return tenant.id;
  }

  trackByRecordId(index: number, record: any): number {
    return record.id;
  }
}
