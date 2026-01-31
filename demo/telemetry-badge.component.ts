import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-telemetry-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-10 right-10 flex items-center gap-5 m3-glass border border-outline-variant shadow-2xl px-6 py-4 rounded-[2rem] z-50">
      <div class="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_12px_#10b981]"></div>
      <div class="flex flex-col">
        <span class="text-[10px] font-black text-primary uppercase tracking-[0.25em]">Telemetry Stream</span>
        <span class="text-[11px] font-bold text-secondary font-mono">Trace: 2026-v4-9204</span>
      </div>
    </div>
  `,
})
export class TelemetryBadgeComponent {}
