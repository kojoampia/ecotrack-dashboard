import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export interface ToastData {
  closable?: boolean;
  message?: string;
  translationMessageKey?: string;
  type: 'info' | 'error' | 'success';
}

@Component({
  selector: 'eco-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ToastData, private snackBarRef: MatSnackBarRef<ToastComponent>) {}

  public close(): void {
    this.snackBarRef.dismiss();
  }

  public getBoolean(value: boolean | undefined): boolean {
    return value == null ? true : value;
  }
}
