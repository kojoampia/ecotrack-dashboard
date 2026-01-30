import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LanguageMenuModule } from '../../home/language-menu/language-menu.module';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ResetPasswordComponent,
      },
    ]),
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    LanguageMenuModule,
  ],
})
export class ResetPasswordModule {}
