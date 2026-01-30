import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from './chat-bot.model';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorage } from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { ChatBotService } from './chat-bot.service';

@Component({
  selector: 'eco-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
})
export class ChatBotComponent implements OnInit, OnDestroy {
  public isToggleChat = false;
  public message = '';
  @SessionStorage() public sender?: string;
  public messages: Message[] = [];
  public firstName = '';
  public lastName = '';
  public email = '';
  subscription?: Subscription;

  constructor(private chatService: ChatBotService, private languageService: JhiLanguageService) {}

  ngOnInit(): void {
    if (this.chatService.isConnected()) {
      this.isToggleChat = true;
    }
  }

  toggleChat(): void {
    this.isToggleChat = !this.isToggleChat;
  }

  send(): void {
    const messageToken = new Message(this.firstName, this.lastName, this.email, this.languageService.currentLang, this.message);
    this.messages.push(messageToken);
    this.chatService.chatMessage(messageToken);
    this.message = '';
  }

  ngOnDestroy(): void {
    this.chatService.unRegister(new Message(this.firstName, this.lastName, this.email, this.languageService.currentLang, 'unsubscribe'));
  }
}
