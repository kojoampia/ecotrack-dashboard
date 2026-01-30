import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminDashboardSharedModule } from 'app/shared/shared.module';
import { UserManagementComponent } from './user-management.component';
import { UserManagementDetailComponent } from './user-management-detail.component';
import { UserManagementUpdateComponent } from './user-management-update.component';
import { UserManagementDeleteDialogComponent } from './user-management-delete-dialog.component';
import { userManagementRoute } from './user-management.route';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NgJhipsterModule } from 'ng-jhipster';
import { ChangeUserPasswordModule } from '../settings/change-user-password/change-user-password.module';

@NgModule({
  imports: [
    AdminDashboardSharedModule,
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TranslateModule,
    NgJhipsterModule,
    ChangeUserPasswordModule,
    RouterModule.forChild(userManagementRoute),
  ],
  declarations: [
    UserManagementComponent,
    UserManagementDetailComponent,
    UserManagementUpdateComponent,
    UserManagementDeleteDialogComponent,
  ],
  entryComponents: [UserManagementDeleteDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserManagementModule {}
