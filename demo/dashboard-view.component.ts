import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { KpiCardComponent } from './kpi-card.component';

declare const Chart: any;

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [CommonModule, MatIconModule, KpiCardComponent],
  template: `
    <div class="animate-m3 space-y-12">
      <!-- KPI Display -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <app-kpi-card
          title="Verified Footprint"
          [value]="totalImpact"
          unit="kg CO2e"
          icon="eco"
          color="primary"
          backgroundIcon="analytics"
          [showBackgroundIcon]="true"
          footerText="LEDGER LIVE: 2026-Q1"
          [showPulse]="true"
        ></app-kpi-card>

        <app-kpi-card
          title="Trust Index"
          [value]="avgConfidencePercent"
          icon="verified"
          color="secondary"
          [progressBar]="true"
          [progressValue]="avgConfidence * 100"
          progressColor="#fbbf24"
        ></app-kpi-card>

        <app-kpi-card
          title="Est. CBAM Tax"
          value="$12.4k"
          icon="warning"
          color="error"
          footerTextUpper="PHASE 3 ENFORCEMENT"
          [italic]="true"
        ></app-kpi-card>
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
  `,
})
export class DashboardViewComponent implements AfterViewInit, OnDestroy {
  @Input() totalImpact: number = 0;
  @Input() avgConfidence: number = 0;
  @Input() scope1Total: number = 0;
  @Input() scope2Total: number = 0;
  @Input() scope3Total: number = 0;

  @ViewChild('trendChart', { static: false }) trendCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('scopeChart', { static: false }) scopeCanvas!: ElementRef<HTMLCanvasElement>;

  private trendChartInstance: any;
  private scopeChartInstance: any;

  get avgConfidencePercent(): string {
    return (this.avgConfidence * 100).toFixed(0) + '%';
  }

  ngAfterViewInit() {
    setTimeout(() => this.initCharts(), 150);
  }

  ngOnDestroy() {
    if (this.trendChartInstance) this.trendChartInstance.destroy();
    if (this.scopeChartInstance) this.scopeChartInstance.destroy();
  }

  initCharts() {
    if (typeof Chart === 'undefined') return;

    this.trendChartInstance = new Chart(this.trendCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            data: [2.8, 3.1, 2.4, 3.6, 4.0, this.totalImpact],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            pointBackgroundColor: '#10b981',
            pointRadius: 6,
            pointHoverRadius: 8,
            fill: true,
            borderWidth: 3,
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
            data: [this.scope1Total, this.scope2Total, this.scope3Total],
            backgroundColor: ['#fbbf24', '#10b981', '#34d399'],
            borderWidth: 0,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '82%', plugins: { legend: { display: false } } },
    });
  }

  refreshCharts() {
    if (this.trendChartInstance) {
      this.trendChartInstance.data.datasets[0].data[5] = this.totalImpact;
      this.trendChartInstance.update();
    }
    if (this.scopeChartInstance) {
      this.scopeChartInstance.data.datasets[0].data = [this.scope1Total, this.scope2Total, this.scope3Total];
      this.scopeChartInstance.update();
    }
  }
}
