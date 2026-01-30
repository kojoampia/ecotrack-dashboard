import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TinyEditorComponent,
  TileboxComponent,
  InfoboxComponent,
  MapComponent,
  NumCardComponent,
  SidebarComponent,
  PiechartComponent,
  StickyHeaderDirective,
  MenuComponent,
} from './index';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { HistogramComponent } from './histogram/histogram.component';
import { TreeMapComponent } from './treemap/treemap.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxTinymceModule } from 'ngx-tinymce';
import { ConsoleLoggerService } from '../console-logger.service';
import { LoaderComponent } from './loading/loader.component';
import { InfoViewComponent } from './infoview/info-view.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxChartsModule,
    NgxTinymceModule.forRoot({
      baseURL: '/tinymce/',
    }),
  ],
  declarations: [
    TinyEditorComponent,
    TileboxComponent,
    InfoboxComponent,
    HeatmapComponent,
    HistogramComponent,
    NumCardComponent,
    TreeMapComponent,
    MapComponent,
    SidebarComponent,
    PiechartComponent,
    LoaderComponent,
    InfoViewComponent,
    StickyHeaderDirective,
    MenuComponent,
    FileViewerComponent,
  ],
  exports: [
    TinyEditorComponent,
    TileboxComponent,
    InfoboxComponent,
    MapComponent,
    HeatmapComponent,
    HistogramComponent,
    NumCardComponent,
    SidebarComponent,
    PiechartComponent,
    LoaderComponent,
    MenuComponent,
    FileViewerComponent,
  ],
  providers: [ConsoleLoggerService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WidgetsModule {}
