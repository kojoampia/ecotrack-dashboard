import { NgModule } from '@angular/core';
import { PrivateDetailComponent } from './detail/private-detail.component';
import { BusinessDetailComponent } from './detail/business-detail.component';
import { MotorVehicleComponent } from './insurance-types/motor-vehicle/motor-vehicle.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule, FontAwesomeModule],
  declarations: [PrivateDetailComponent, BusinessDetailComponent, MotorVehicleComponent],
  exports: [PrivateDetailComponent, BusinessDetailComponent, MotorVehicleComponent],
})
export class DetailViewsModule {}
