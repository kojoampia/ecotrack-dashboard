import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import SharedModule from 'app/shared/shared.module';
import { User } from '../user-management.model';
import { UserManagementService } from '../service/user-management.service';

@Component({
  standalone: true,
  selector: 'jhi-user-mgmt-delete-dialog',
  templateUrl: './user-management-delete-dialog.component.html',
  imports: [SharedModule, FormsModule, MatDialogModule, MatButtonModule],
})
export default class UserManagementDeleteDialogComponent {
  user?: User;

  constructor(
    private userService: UserManagementService,
    public dialogRef: MatDialogRef<UserManagementDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
  ) {
    this.user = data.user;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirmDelete(login: string): void {
    this.userService.delete(login).subscribe(() => {
      this.dialogRef.close('deleted');
    });
  }
}
