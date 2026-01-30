import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { TrackerActivity } from './tracker-activity.model';
// import { SERVER_API_URL } from '../../app.constants';
import { WebsocketAuthService } from '../auth/websocket-auth.service';
@Injectable({ providedIn: 'root' })
export class TrackerService {
  private listenerSubject: Subject<TrackerActivity> = new Subject();
  // public resourceUrl = SERVER_API_URL;

  constructor(private websocketService: WebsocketAuthService, private router: Router) {}

  receive(): Subject<TrackerActivity> {
    return this.listenerSubject;
  }

  subscribe(): void {
    this.listenerSubject = this.websocketService.subscribe('/topic/tracker');
  }

  initialize(): void {
    this.sendActivity();
    this.router.events.pipe(filter((event: Event) => event instanceof NavigationEnd)).subscribe(() => this.sendActivity());
  }

  sendActivity(): void {
    if (this.websocketService.isConnected()) {
      this.websocketService.stompClient().send(
        '/topic/activity', // destination
        JSON.stringify({ page: this.router.routerState.snapshot.url }), // body
        {} // header
      );
    }
  }
}
