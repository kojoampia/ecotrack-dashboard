import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, TranslateModule, MatSnackBarModule],
})
export class ToastModule {}
