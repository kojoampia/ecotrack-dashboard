/* eslint-disable no-debugger */
import { Injectable } from '@angular/core';
import { Event, Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string | undefined>(undefined);

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public closeNav(): void {
    this.appDrawer.close();
  }

  public openNav(): void {
    this.appDrawer.open();
  }
}
