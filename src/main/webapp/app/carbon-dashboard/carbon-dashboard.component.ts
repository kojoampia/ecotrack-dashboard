import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'jhi-carbon-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, MatCardModule, MatGridListModule, MatButtonModule],
  templateUrl: './carbon-dashboard.component.html',
  styleUrls: ['./carbon-dashboard.component.scss'],
})
export class CarbonDashboardComponent {
  selectedView = 'overview'; // Default view

  // Total footprint
  totalFootprint = 5400; // kg CO2e

  // Pie chart options
  pieView: [number, number] = [400, 300];

  // Line chart options
  lineView: [number, number] = [600, 300];

  // Chart options
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Emission Scopes';
  showYAxisLabel = true;
  yAxisLabel = 'Emissions (tons CO2e)';
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#4caf50', '#388e3c', '#2e7d32', '#1b5e20'],
  };

  // Emissions by Source data for pie chart
  emissionsBySourceData = [
    {
      name: 'Scope 1',
      value: 1200,
    },
    {
      name: 'Scope 2',
      value: 1100,
    },
    {
      name: 'Scope 3',
      value: 3100,
    },
  ];

  // Emissions trend data for line chart
  emissionsTrendData = [
    {
      name: 'Total Emissions',
      series: [
        { name: 'Jan', value: 4500 },
        { name: 'Feb', value: 4800 },
        { name: 'Mar', value: 5200 },
        { name: 'Apr', value: 5000 },
        { name: 'May', value: 5300 },
        { name: 'Jun', value: 5400 },
      ],
    },
  ];

  // Sample data for stacked bar chart (kept for reference)
  multi = [
    {
      name: 'Scope 1',
      series: [
        {
          name: 'Direct Emissions',
          value: 1200,
        },
        {
          name: 'Indirect Emissions',
          value: 800,
        },
      ],
    },
    {
      name: 'Scope 2',
      series: [
        {
          name: 'Purchased Electricity',
          value: 900,
        },
        {
          name: 'Other Indirect',
          value: 200,
        },
      ],
    },
    {
      name: 'Scope 3',
      series: [
        {
          name: 'Supply Chain',
          value: 2500,
        },
        {
          name: 'Transportation',
          value: 1000,
        },
        {
          name: 'Waste',
          value: 500,
        },
      ],
    },
  ];
}
