import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IProduct } from '../product.model';
import { ProductService } from '../service/product.service';

@Component({
  standalone: true,
  templateUrl: './product-delete-dialog.component.html',
  imports: [SharedModule, FormsModule, MatDialogModule, MatButtonModule],
})
export class ProductDeleteDialogComponent {
  product?: IProduct;

  constructor(
    protected productService: ProductService,
    public dialogRef: MatDialogRef<ProductDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: IProduct },
  ) {
    this.product = data.product;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirmDelete(id: number): void {
    this.productService.delete(id).subscribe(() => {
      this.dialogRef.close(ITEM_DELETED_EVENT);
    });
  }
}
