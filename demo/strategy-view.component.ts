import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

declare const Plotly: any;

@Component({
  selector: 'app-strategy-view',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="animate-m3 max-w-5xl mx-auto space-y-12">
      <div class="p-12 m3-glass rounded-[4rem] border border-primary/20 relative overflow-hidden">
        <div class="absolute -right-20 -top-20 opacity-[0.05] pointer-events-none">
          <mat-icon class="scale-[18] text-primary">auto_awesome</mat-icon>
        </div>

        <div class="flex items-center gap-8 mb-12">
          <div class="w-20 h-20 bg-primary text-on-primary rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary/30">
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
          @if (isAnalyzing) {
          <div class="flex flex-col items-center gap-8 py-10">
            <div class="w-14 h-14 border-[6px] border-primary/10 border-t-primary rounded-full animate-spin"></div>
            <div class="text-[11px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">
              Running Sector Simulation...
            </div>
          </div>
          } @else if (aiResponse) {
          <div class="m3-ai-output text-on-surface-variant leading-relaxed space-y-6 text-lg font-medium" [innerHTML]="aiResponse"></div>
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
            (click)="onGenerateInsights()"
            [disabled]="isAnalyzing"
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
          <div class="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-md">
            <mat-icon>chat</mat-icon>
          </div>
          <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface">EcoAssistant v3</h3>
        </div>
        <mat-form-field appearance="outline" class="w-full m3-chat-field">
          <mat-label class="font-bold tracking-wide">Query regulatory impact...</mat-label>
          <input
            matInput
            [(ngModel)]="chatQuery"
            (keyup.enter)="onAskAssistant()"
            [placeholder]="'e.g. how does CBAM affect ' + activeTenantIndustry + ' exports?'"
          />
          <button matSuffix mat-icon-button (click)="onAskAssistant()" class="text-primary mr-2">
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
  `,
})
export class StrategyViewComponent implements AfterViewInit, OnDestroy {
  @Input() isAnalyzing: boolean = false;
  @Input() aiResponse: string | null = null;
  @Input() activeTenantIndustry: string = '';
  @Output() generateInsights = new EventEmitter<void>();
  @Output() askAssistant = new EventEmitter<string>();

  chatQuery = '';

  ngAfterViewInit() {
    setTimeout(() => this.initLatencyPlot(), 150);
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  onGenerateInsights() {
    this.generateInsights.emit();
  }

  onAskAssistant() {
    if (!this.chatQuery.trim()) return;
    this.askAssistant.emit(this.chatQuery);
    this.chatQuery = '';
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
}
