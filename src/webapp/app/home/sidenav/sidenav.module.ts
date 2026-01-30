import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NgJhipsterModule } from 'ng-jhipster';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatListModule, RouterModule, NgJhipsterModule, MatIconModule],
  exports: [SidenavComponent],
  declarations: [SidenavComponent],
})
export class SidenavModule {}
