import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ActivateComponent } from './activate.component';
import { NgJhipsterModule } from 'ng-jhipster';
import { LanguageMenuModule } from '../../home/language-menu/language-menu.module';

@NgModule({
  declarations: [ActivateComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ActivateComponent,
      },
    ]),
    CommonModule,
    MatCardModule,
    NgJhipsterModule,
    LanguageMenuModule,
  ],
})
export class ActivateModule {}
