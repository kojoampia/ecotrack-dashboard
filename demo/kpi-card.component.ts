import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="m3-glass p-8 rounded-[2.5rem] border border-outline-variant relative overflow-hidden group">
      @if (showBackgroundIcon) {
      <div class="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <mat-icon class="scale-[5]" [class]="'text-' + color">{{ backgroundIcon }}</mat-icon>
      </div>
      }
      <div class="text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2" [class]="'text-' + color">
        <mat-icon class="scale-75" [class]="'text-' + color">{{ icon }}</mat-icon> {{ title }}
      </div>
      <div class="text-6xl font-black text-on-surface tracking-tighter leading-none mb-4" [class.italic]="italic">
        {{ value }}<span *ngIf="unit" class="text-sm font-bold text-outline ml-3">{{ unit }}</span>
      </div>
      @if (progressBar) {
      <div class="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden border border-outline-variant">
        <div class="h-full" [class]="'bg-' + color + ' shadow-[0_0_10px_' + progressColor + ']'" [style.width]="progressValue + '%'"></div>
      </div>
      }
      @if (footerText) {
      <div class="flex items-center gap-2 text-[10px] font-bold italic" [class]="'text-' + color">
        @if (showPulse) {
        <span class="w-2 h-2 rounded-full animate-pulse" [class]="'bg-' + color"></span>
        }
        {{ footerText }}
      </div>
      }
      @if (footerTextUpper) {
      <div class="text-[10px] font-black uppercase flex items-center gap-2 tracking-widest" [class]="'text-' + color">{{ footerTextUpper }}</div>
      }
    </div>
  `,
})
export class KpiCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() unit: string = '';
  @Input() icon: string = '';
  @Input() color: string = 'primary';
  @Input() backgroundIcon: string = '';
  @Input() showBackgroundIcon: boolean = false;
  @Input() progressBar: boolean = false;
  @Input() progressValue: number = 0;
  @Input() progressColor: string = '#10b981';
  @Input() footerText: string = '';
  @Input() footerTextUpper: string = '';
  @Input() showPulse: boolean = false;
  @Input() italic: boolean = false;
}
