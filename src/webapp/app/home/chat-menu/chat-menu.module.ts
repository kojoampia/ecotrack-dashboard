import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ChatMenuComponent } from './chat-menu.component';

@NgModule({
  declarations: [ChatMenuComponent],
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  exports: [ChatMenuComponent],
})
export class ChatMenuModule {}
