import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChatBotComponent } from './chat-bot.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatBotComponent],
  imports: [CommonModule, FormsModule, NgbModule],
  exports: [ChatBotComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatBotModule {}
