import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription, ReplaySubject, Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';

import { Message } from './data.model';

@Injectable({ providedIn: 'root' })
export class ConversationService {
  private stompClient: Stomp.Client | null = null;
  private routerSubscription: Subscription | null = null;
  private connectionSubject: ReplaySubject<void> = new ReplaySubject(1);
  // Registration connection
  private registrationSubscription: Subscription | null = null;
  private registrationListener: Subject<Message> = new Subject();
  private registrationStompSubscription: Stomp.Subscription | null = null;
  // Chat connection
  private chatSubscription: Subscription | null = null;
  private chatListener: Subject<Message> = new Subject();
  private chatStompSubscription: Stomp.Subscription | null = null;

  constructor(private location: Location) {}

  connect(): void {
    if (this.stompClient && this.stompClient.connected) {
      return;
    }
    // building absolute path so that websocket doesn't fail when deploying with a context path
    let url = '/websocket/customer_service';
    url = this.location.prepareExternalUrl(url);
    const socket: WebSocket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const headers: Stomp.ConnectionHeaders = {};
    this.stompClient.connect(headers, () => {
      this.connectionSubject.next();
    });
  }

  disconnect(): void {
    this.unsubscribe();

    this.connectionSubject = new ReplaySubject(1);

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      this.routerSubscription = null;
    }

    if (this.stompClient) {
      if (this.stompClient.connected) {
        this.stompClient.disconnect();
      }
      this.stompClient = null;
    }
  }

  public unsubscribe(): void {
    if (this.registrationStompSubscription) {
      this.registrationStompSubscription.unsubscribe();
      this.registrationStompSubscription = null;
    }
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
      this.registrationSubscription = null;
    }
    if (this.chatStompSubscription) {
      this.chatStompSubscription.unsubscribe();
      this.chatStompSubscription = null;
    }
  }

  /** Chat channel setup */
  public chatMessage(message: any): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/topic/customer_message', JSON.stringify(message));
    }
  }

  public chatChannel(): void {
    if (this.chatSubscription) {
      return;
    }
    this.chatSubscription = this.connectionSubject.subscribe(() => {
      if (this.stompClient) {
        this.chatStompSubscription = this.stompClient.subscribe('/user/queue/service', (data: Stomp.Message) => {
          this.chatListener.next(JSON.parse(data.body));
        });
      }
    });
  }

  public receiveChat(): Subject<Message> {
    return this.chatListener;
  }

  /** Registration channel setup */
  public register(registration: any): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/topic/register', JSON.stringify(registration));
    }
  }

  public registerChat(): void {
    if (this.registrationSubscription) {
      return;
    }
    this.registrationSubscription = this.connectionSubject.subscribe(() => {
      if (this.stompClient) {
        this.registrationStompSubscription = this.stompClient.subscribe('/user/queue/service', (data: Stomp.Message) => {
          this.registrationListener.next(JSON.parse(data.body));
        });
      }
    });
  }

  public receiveRegistration(): Subject<Message> {
    return this.registrationListener;
  }

  public unRegister(message: any): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/topic/unregister', JSON.stringify(message));
    }
  }
}
