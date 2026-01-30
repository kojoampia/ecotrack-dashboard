import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMenuComponent } from './admin-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NgJhipsterModule } from 'ng-jhipster';

@NgModule({
  declarations: [AdminMenuComponent],
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule, RouterModule, NgJhipsterModule],
  exports: [AdminMenuComponent],
})
export class AdminMenuModule {}
