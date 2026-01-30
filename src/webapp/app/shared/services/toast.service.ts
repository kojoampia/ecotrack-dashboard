import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent, ToastData } from './toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  public open(data: ToastData, duration?: number): void {
    this.snackBar.openFromComponent(ToastComponent, {
      data,
      duration,
      verticalPosition: 'top',
      panelClass: [`toast-${data.type}`],
    });
  }
}
