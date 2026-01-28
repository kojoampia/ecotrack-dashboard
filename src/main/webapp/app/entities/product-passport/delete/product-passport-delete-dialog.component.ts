import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IProductPassport } from '../product-passport.model';
import { ProductPassportService } from '../service/product-passport.service';

@Component({
  standalone: true,
  templateUrl: './product-passport-delete-dialog.component.html',
  imports: [SharedModule, FormsModule, MatDialogModule, MatButtonModule],
})
export class ProductPassportDeleteDialogComponent {
  productPassport?: IProductPassport;

  constructor(
    protected productPassportService: ProductPassportService,
    public dialogRef: MatDialogRef<ProductPassportDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productPassport: IProductPassport },
  ) {
    this.productPassport = data.productPassport;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirmDelete(id: number): void {
    this.productPassportService.delete(id).subscribe(() => {
      this.dialogRef.close(ITEM_DELETED_EVENT);
    });
  }
}
