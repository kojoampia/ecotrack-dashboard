import { Injectable } from '@angular/core';
import { Subscription, ReplaySubject, Subject } from 'rxjs';
import * as Stomp from 'webstomp-client';
import { Message } from './chat-bot.model';
import { ECO_DASHBOARD_URL } from '../../app.constants';
import { WebsocketAuthService } from '../../core/auth/websocket-auth.service';

@Injectable({ providedIn: 'root' })
export class ChatBotService {
  private routerSubscription: Subscription | null = null;
  private connectionSubject: ReplaySubject<void> = new ReplaySubject(1);
  private connectionSubscription: Subscription | null = null;
  private stompSubscription: Stomp.Subscription | null = null;
  private listenerSubject: Subject<Message> = new Subject();

  // Chat connection
  private chatSubscription: Subscription | null = null;
  private chatListener: Subject<Message> = new Subject();
  private chatStompSubscription: Stomp.Subscription | null = null;
  private privateStompSubscription: Stomp.Subscription | null = null;

  constructor(private websocketService: WebsocketAuthService) {}

  isConnected(): boolean {
    return this.websocketService.isConnected();
  }

  connect(): void {
    this.websocketService.connect();
  }

  disconnect(): void {
    this.unsubscribe();

    this.connectionSubject = new ReplaySubject(1);

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      this.routerSubscription = null;
    }
  }

  receive(): Subject<Message> {
    return this.listenerSubject;
  }

  subscribe(): void {
    const url = ECO_DASHBOARD_URL + '/topic/tracker';
    if (this.connectionSubscription) {
      return;
    }

    this.connectionSubscription = this.connectionSubject.subscribe(() => {
      if (this.websocketService.stompClient()) {
        this.stompSubscription = this.websocketService.stompClient().subscribe(url, (data: Stomp.Message) => {
          this.listenerSubject.next(JSON.parse(data.body));
        });
      }
    });
  }

  unsubscribe(): void {
    if (this.stompSubscription) {
      this.stompSubscription.unsubscribe();
      this.stompSubscription = null;
    }

    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
      this.connectionSubscription = null;
    }

    if (this.chatStompSubscription) {
      this.chatStompSubscription.unsubscribe();
      this.chatStompSubscription = null;
    }

    if (this.privateStompSubscription) {
      this.privateStompSubscription.unsubscribe();
      this.privateStompSubscription = null;
    }
  }

  public send(message: string, destination: string): void {
    if (this.isConnected()) {
      this.websocketService.stompClient().send(
        destination, // destination
        message, // body
        {} // header
      );
    }
  }

  /** Chat channel setup */
  public chatMessage(message: any): void {
    if (this.isConnected()) {
      this.websocketService.stompClient().send('/topic/customer_service', JSON.stringify(message), {});
    }
  }

  public sendMessageToUser(message: any, recipient: string): void {
    if (this.isConnected()) {
      this.websocketService.stompClient().send('/topic/' + recipient, JSON.stringify(message), {});
    }
  }

  public chatChannel(): void {
    if (this.chatSubscription) {
      return;
    }
    this.chatSubscription = this.connectionSubject.subscribe(() => {
      if (this.isConnected()) {
        this.chatStompSubscription = this.websocketService.stompClient().subscribe('/topic/customer/message', (data: Stomp.Message) => {
          this.chatListener.next(JSON.parse(data.body));
        });
        this.privateStompSubscription = this.websocketService.stompClient().subscribe('/user/queue/private', (data: Stomp.Message) => {
          this.chatListener.next(JSON.parse(data.body));
        });
      }
    });
  }

  public receiveChat(): Subject<Message> {
    return this.chatListener;
  }

  public unRegister(message: any): void {
    if (this.isConnected()) {
      this.websocketService.stompClient().send('/topic/unregister', JSON.stringify(message), {});
    }
  }
}
