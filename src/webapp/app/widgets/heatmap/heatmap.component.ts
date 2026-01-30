import { OnInit, Component, Input, EventEmitter, Output } from '@angular/core';

/** series is a list of name:value pairs eg. series:[ {name: banks, value: 3}, {name: transport: value: 26} ] */
export class HeatmapData {
  name?: string;
  series?: any[];
  constructor(name?: string, series?: any[]) {
    this.name = name;
    this.series = series;
  }
}

@Component({
  selector: 'eco-heatmap',
  templateUrl: './heatmap.component.html',
})
export class HeatmapComponent implements OnInit {
  @Output() dataSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input() heatmapData: HeatmapData[];
  @Input() view: [number, number] = [880, 300];
  @Input() showXAxis = false;
  @Input() showYAxis = false;
  @Input() gradient = false;
  @Input() showLegend = false;
  @Input() showXAxisLabel = false;
  @Input() xAxisLabel = '';
  @Input() showYAxisLabel = false;
  @Input() yAxisLabel = '';
  @Input() colorScheme = {
    domain: ['#E1F7E7', '#A9E8DC', '#02BEC4', '#0284A8', '#050C42'],
  };
  @Input() customColors: any[] = [];

  constructor() {
    this.heatmapData = [];
  }

  ngOnInit(): void {
    if (typeof this.heatmapData === 'undefined') {
      this.heatmapData = [];
    }
  }

  onSelect(event: any): void {
    // console.log('listen: on-heatmap-select');
    // console.log(event);
    this.dataSelected.emit(event);
  }
}
