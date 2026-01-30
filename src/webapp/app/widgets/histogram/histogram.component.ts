import { OnInit, Component, Input, EventEmitter, Output, TemplateRef } from '@angular/core';

export class HistogramData {
  name?: string;
  value?: number;
  data?: any;
  constructor(name?: string, value?: number, data?: any) {
    this.name = name;
    this.value = value;
    this.data = data;
  }
}

@Component({
  selector: 'eco-histogram',
  templateUrl: './histogram.component.html',
})
export class HistogramComponent implements OnInit {
  @Output() dataSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input() view: [number, number] = [1200, 400];
  @Input() histogramData: HistogramData[] = [];
  @Input() colorScheme = {
    domain: ['#5ADF99', '#E1F7E7', '#A9E8DC', '#02BEC4', '#0284A8', '#2497E8', '#286EFF', '#050C44'],
  };
  @Input() schemeType = 'ordinal'; // linear
  @Input() customColors: any[] = [];
  @Input() animations = true;
  @Input() showLegend = true;
  @Input() legendTitle = '';
  @Input() legendPosition = 'right'; // ['right','below']
  @Input() showXAxis = false;
  @Input() showYAxis = false;
  @Input() showGridLines = false;
  @Input() showRoundDomains = false;
  @Input() showXAxisLabel = false;
  @Input() showYAxisLabel = false;
  @Input() xAxisLabel = '';
  @Input() yAxisLabel = '';
  @Input() trimXAxisTicks = false;
  @Input() trimYAxisTicks = false;
  @Input() maxXAxisTickLength = 10;
  @Input() maxYAxisTickLength = 10;
  @Input() xAxisTickFormating = Object.assign({});
  @Input() yAxisTickFormating = Object.assign({});
  @Input() xAxisTicks: any[] = [];
  @Input() yAxisTicks: any[] = [];
  @Input() showDataLabel = true;
  @Input() gradient = false;
  @Input() activeEntries: object[] = [];
  @Input() barPadding = 5;
  @Input() tooltipDisabled = false;
  @Input() tooltipTemplate: TemplateRef<any> = Object.assign({});
  @Input() yScaleMax = 10;
  @Input() yScaleMin = 10;
  @Input() yScale = 1;
  @Input() roundEdges = true;

  constructor() {}

  ngOnInit(): void {
    if (!this.histogramData) {
      this.histogramData = [];
    }
  }

  onSelect(event: any): void {
    // console.log('listen: on-histogram-select');
    // console.log(event);
    this.dataSelected.emit(event);
  }
}

/** series is a list of name:value pairs eg. series:[ {name: banks, value: 3}, {name: transport: value: 26} ] */
