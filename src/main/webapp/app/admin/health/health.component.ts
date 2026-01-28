import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import SharedModule from 'app/shared/shared.module';
import { HealthService } from './health.service';
import { Health, HealthDetails, HealthStatus } from './health.model';
import HealthModalComponent from './modal/health-modal.component';

@Component({
  standalone: true,
  selector: 'jhi-health',
  templateUrl: './health.component.html',
  imports: [SharedModule, HealthModalComponent, MatDialogModule],
})
export default class HealthComponent implements OnInit {
  health?: Health;

  constructor(
    private dialog: MatDialog,
    private healthService: HealthService,
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  getBadgeClass(statusState: HealthStatus): string {
    if (statusState === 'UP') {
      return 'bg-success';
    }
    return 'bg-danger';
  }

  refresh(): void {
    this.healthService.checkHealth().subscribe({
      next: health => (this.health = health),
      error: (error: HttpErrorResponse) => {
        if (error.status === 503) {
          this.health = error.error;
        }
      },
    });
  }

  showHealth(health: { key: string; value: HealthDetails }): void {
    this.dialog.open(HealthModalComponent, { data: { health } });
  }
}
