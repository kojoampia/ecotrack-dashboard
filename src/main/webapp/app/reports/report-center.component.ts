import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ComplianceReport {
  id: number;
  reportType: string;
  reportPeriodStart: string;
  reportPeriodEnd: string;
  totalEmissions: number;
  status: string;
  submittedAt?: string;
  payloadGenerated?: boolean;
}

interface AuditTrailStatus {
  totalReports: number;
  generatedReports: number;
  pendingReports: number;
  errorReports: number;
}

@Component({
  selector: 'jhi-report-center',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
  ],
  templateUrl: './report-center.component.html',
  styleUrls: ['./report-center.component.scss'],
})
export class ReportCenterComponent implements OnInit {
  reports: ComplianceReport[] = [];
  auditTrailStatus: AuditTrailStatus = {
    totalReports: 0,
    generatedReports: 0,
    pendingReports: 0,
    errorReports: 0,
  };
  loading = false;
  displayedColumns: string[] = ['id', 'period', 'emissions', 'status', 'actions'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadReports();
    this.loadAuditTrailStatus();
  }

  loadReports(): void {
    this.loading = true;
    this.http.get<ComplianceReport[]>('/api/compliance-reports').subscribe({
      next: data => {
        this.reports = data;
        this.loading = false;
      },
      error: error => {
        console.error('Error loading reports:', error);
        this.loading = false;
      },
    });
  }

  loadAuditTrailStatus(): void {
    // Calculate status from reports
    this.auditTrailStatus.totalReports = this.reports.length;
    this.auditTrailStatus.generatedReports = this.reports.filter(r => r.payloadGenerated).length;
    this.auditTrailStatus.pendingReports = this.reports.filter(r => r.status === 'PENDING').length;
    this.auditTrailStatus.errorReports = this.reports.filter(r => r.status === 'ERROR').length;
  }

  generateReport(reportId: number): void {
    this.http.post(`/api/compliance-reports/${reportId}/generate-payload`, {}).subscribe({
      next: () => {
        this.loadReports();
      },
      error: error => {
        console.error('Error generating report:', error);
      },
    });
  }

  downloadAuditReport(reportId: number): void {
    window.open(`/api/compliance-reports/${reportId}/download`, '_blank');
  }

  downloadCBAMPayload(reportId: number): void {
    // This would download the CBAM XML payload
    window.open(`/api/compliance-payload/${reportId}/download`, '_blank');
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'GENERATED':
        return 'primary';
      case 'PENDING':
        return 'accent';
      case 'ERROR':
        return 'warn';
      default:
        return '';
    }
  }
}
