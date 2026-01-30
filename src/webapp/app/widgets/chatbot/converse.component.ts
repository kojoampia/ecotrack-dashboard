import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message, Customer } from './data.model';
import { ConversationService } from './converse.service';
import { Subscription } from 'rxjs';
import { SessionStorage } from 'ngx-webstorage';
import { JhiLanguageService } from 'ng-jhipster';

@Component({
  selector: 'eco-converse',
  templateUrl: './converse.component.html',
  styleUrls: ['./converse.component.scss'],
})
export class ConverseComponent implements OnInit, OnDestroy {
  public isToggleChat = false;
  public message = '';
  @SessionStorage() public sender?: string;
  public messages: Message[] = [];
  @SessionStorage() public client?: Customer;
  public firstName = '';
  public lastName = '';
  public email = '';
  subscription?: Subscription;

  constructor(private chatService: ConversationService, private languageService: JhiLanguageService) {}

  ngOnInit(): void {
    this.chatService.registerChat();
    this.chatService.chatChannel();
    this.subscription = this.chatService.receiveChat().subscribe((message: Message) => {
      this.messages?.push(message);
    });
    this.subscription = this.chatService.receiveRegistration().subscribe((message: Message) => {
      this.messages?.push(message);
    });
    if (this.client) {
      const aliceMessage = 'Hello ' + this.client.firstName + ' how may we help you?';
      this.messages.push(new Message('Customer', 'Service', 'service@jojoaddison.net', aliceMessage));
    }
  }

  toggleChat(): void {
    this.isToggleChat = !this.isToggleChat;
  }

  send(): void {
    if (this.sender) {
      const messageToken = new Message(this.firstName, this.lastName, this.email, this.languageService.currentLang, this.message);
      this.messages.push(messageToken);
      this.chatService.chatMessage(messageToken);
      this.message = '';
    }
  }

  register(): void {
    this.client = new Customer(this.firstName, this.lastName, this.email, this.languageService.currentLang);
    this.sender = this.email;
    const aliceMessage = 'Hello ' + this.firstName + ' how may we help you?';
    this.messages.push(new Message('Customer', 'Service', 'service@jojoaddison.net', aliceMessage));
    const messageToken = new Message(this.firstName, this.lastName, this.email, 'Hello! Here is ' + this.sender + '. I have a question.');
    this.chatService.register(messageToken);
  }

  ngOnDestroy(): void {
    this.chatService.unRegister(new Message(this.firstName, this.lastName, this.email, this.languageService.currentLang, 'unsubscribe'));
  }
}
