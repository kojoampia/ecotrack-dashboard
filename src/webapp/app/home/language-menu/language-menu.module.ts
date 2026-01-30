import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageMenuComponent } from './language-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [LanguageMenuComponent],
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  exports: [LanguageMenuComponent],
})
export class LanguageMenuModule {}
