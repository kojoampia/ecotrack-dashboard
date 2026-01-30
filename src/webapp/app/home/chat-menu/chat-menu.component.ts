import { Component, OnInit } from '@angular/core';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'eco-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss'],
})
export class ChatMenuComponent implements OnInit {
  chat: string;
  messageArrived?: boolean;

  constructor(private eventManager: JhiEventManager) {
    this.chat = '';
    this.messageArrived = false;
  }

  ngOnInit(): void {}

  open(): void {
    this.eventManager.broadcast('open-chat');
  }
}
