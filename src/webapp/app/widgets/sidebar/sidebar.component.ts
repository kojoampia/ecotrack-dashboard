import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { LocalStorage } from 'ngx-webstorage';
import { MenuItem } from '../menu/menu-item';

@Component({
  selector: 'eco-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() itemSelected: EventEmitter<MenuItem> = new EventEmitter<MenuItem>();
  @Input() sidebarItems?: MenuItem[];
  @LocalStorage() isSidebarCollapsed: boolean;
  @LocalStorage() isHideSidebar: boolean;
  @LocalStorage() sidebarItem: MenuItem;
  @Input() title: string;

  constructor(private eventManager: JhiEventManager) {
    this.title = '';
    this.isHideSidebar = false;
    this.isSidebarCollapsed = false;
    this.sidebarItem = Object.assign({});
  }

  ngOnInit(): void {}

  toggleSidebarCollapse(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleHideSidebar(): void {
    this.isHideSidebar = !this.isHideSidebar;
    const event: JhiEventWithContent<any> = Object.assign({ hideSidebar: this.isHideSidebar });
    this.eventManager.broadcast(event);
  }

  onMenuItemSelected(item: MenuItem): void {
    // console.log('item-selected');
    // console.log(item);
    this.sidebarItem = Object.assign({}, item);
    this.itemSelected.emit(item);
  }

  highlightSelected(item: MenuItem): boolean {
    // console.log('sidebar::>>highlight');
    // console.log(this.sidebarItem);
    if (!this.sidebarItem) {
      return false;
    }
    return this.sidebarItem.name === item.name;
  }
}
