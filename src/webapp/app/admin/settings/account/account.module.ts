import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ViewAccountComponent } from './view/view-account.component';
import { EditAccountComponent } from './edit/edit-account.component';
import { MatButtonModule } from '@angular/material/button';
import { AvatarModule } from 'ngx-avatar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgJhipsterModule } from 'ng-jhipster';

@NgModule({
  declarations: [EditAccountComponent, ViewAccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatButtonModule,
    AvatarModule,
    MatListModule,
    NgJhipsterModule,
  ],
})
export class AccountModule {}
