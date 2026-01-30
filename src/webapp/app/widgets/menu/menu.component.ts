/* eslint-disable no-debugger */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from './menu-item';
import { MenuService } from './menu.service';

@Component({
  selector: 'eco-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isExpanded = false;
  @Input() navigationDepth = 0;
  @Input() menuItem?: MenuItem;
  // tslint:disable-next-line: no-output-rename
  @Output('menuSelected') itemSelected: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();
  url = '';
  constructor(public menuService: MenuService, public router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.menuService.currentUrl.next(event.urlAfterRedirects);
        this.url = event.urlAfterRedirects;
      }
    });
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    if (this.menuItem && this.menuItem.url) {
      this.isExpanded = this.url !== undefined && this.url.includes(this.menuItem.url);
    }
    this.menuService.currentUrl.subscribe((url: any) => {
      if (this.menuItem && this.menuItem.url && url) {
        this.isExpanded = url.includes(this.menuItem.url);
      }
    });
  }

  onItemSelected(item: MenuItem): void {
    if (item.subMenuItems && item.subMenuItems.length) {
      this.isExpanded = !this.isExpanded;
    }

    if (!item.subMenuItems || !item.subMenuItems.length) {
      this.router.navigate([item.url]);
    }
  }
}
