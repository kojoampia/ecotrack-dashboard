import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SettingMenuComponent } from './setting-menu.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [SettingMenuComponent],
  imports: [CommonModule, TranslateModule, RouterModule, MatIconModule, MatMenuModule, MatButtonModule, AvatarModule],
  exports: [SettingMenuComponent],
})
export class SettingMenuModule {}
