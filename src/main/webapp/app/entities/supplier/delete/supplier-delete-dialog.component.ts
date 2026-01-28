import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISupplier } from '../supplier.model';
import { SupplierService } from '../service/supplier.service';

@Component({
  standalone: true,
  templateUrl: './supplier-delete-dialog.component.html',
  imports: [SharedModule, FormsModule, MatDialogModule, MatButtonModule],
})
export class SupplierDeleteDialogComponent {
  supplier?: ISupplier;

  constructor(
    protected supplierService: SupplierService,
    public dialogRef: MatDialogRef<SupplierDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { supplier: ISupplier },
  ) {
    this.supplier = data.supplier;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirmDelete(id: number): void {
    this.supplierService.delete(id).subscribe(() => {
      this.dialogRef.close(ITEM_DELETED_EVENT);
    });
  }
}
