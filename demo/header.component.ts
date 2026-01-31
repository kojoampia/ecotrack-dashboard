import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TenantMetadata } from './models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatSelectModule, MatFormFieldModule],
  template: `
    <header class="h-20 m3-glass-header border-b border-outline-variant flex items-center justify-between px-10 z-40">
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-3">
          <h2 class="text-[10px] font-black text-outline uppercase tracking-[0.3em]">Vault</h2>
          <mat-icon class="text-outline-variant scale-75">chevron_right</mat-icon>
          <h2 class="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">{{ currentView }}</h2>
        </div>

        <mat-form-field appearance="outline" class="m3-select-compact" subscriptSizing="dynamic">
          <mat-select [ngModel]="selectedTenantId" (ngModelChange)="onTenantChange($event)">
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
  `,
})
export class HeaderComponent {
  @Input() currentView: string = '';
  @Input() selectedTenantId: string = '';
  @Input() tenantPool: TenantMetadata[] = [];
  @Output() tenantChange = new EventEmitter<string>();

  onTenantChange(tenantId: string) {
    this.tenantChange.emit(tenantId);
  }
}
