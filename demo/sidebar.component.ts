import { Component, Input, Output, EventEmitter, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { NavItem } from './models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatRippleModule],
  template: `
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
            (click)="onViewChange(item.id)"
            [class.m3-nav-active]="currentView === item.id"
            class="m3-nav-item flex items-center gap-4 px-4 py-3.5 rounded-full transition-all group"
          >
            <mat-icon
              [class.text-primary]="currentView === item.id"
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
            <div class="text-[11px] font-black text-on-surface truncate tracking-tight uppercase">{{ activeTenantName }}</div>
            <div class="text-[9px] text-primary font-black tracking-widest uppercase italic">{{ activeTenantIndustry }}</div>
          </div>
        </div>
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  @Input() navItems: NavItem[] = [];
  @Input() currentView: string = '';
  @Input() activeTenantName: string = '';
  @Input() activeTenantIndustry: string = '';
  @Output() viewChange = new EventEmitter<string>();

  onViewChange(viewId: string) {
    this.viewChange.emit(viewId);
  }
}
