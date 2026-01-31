import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmissionRecord } from './models';

@Component({
  selector: 'app-ledger-view',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  template: `
    <div class="animate-m3 space-y-10">
      <div class="flex justify-between items-end px-4">
        <div>
          <h2 class="text-4xl font-black tracking-tighter text-on-surface italic uppercase">The Ledger</h2>
          <p class="text-xs font-bold text-outline mt-2 uppercase tracking-[0.2em]">
            Primary Record Verification // {{ activeTenantName }}
          </p>
        </div>
        <button mat-stroked-button class="m3-rounded-btn-outline h-12 px-6">
          <mat-icon class="mr-2">history</mat-icon> VIEW AUDIT LOG
        </button>
      </div>

      <div class="m3-glass rounded-[3rem] border border-outline-variant overflow-hidden mx-2 shadow-2xl">
        <table mat-table [dataSource]="records" class="w-full m3-table">
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
  `,
})
export class LedgerViewComponent {
  @Input() records: EmissionRecord[] = [];
  @Input() activeTenantName: string = '';

  displayedColumns = ['scope', 'source', 'impact', 'confidence'];

  getScopeM3Class(scope: string) {
    if (scope === 'SCOPE_1') return 'text-secondary border-secondary/30 bg-secondary/10';
    if (scope === 'SCOPE_2') return 'text-primary border-primary/30 bg-primary/10';
    return 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10';
  }
}
