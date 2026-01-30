import { Component, OnInit } from '@angular/core';
import { SidenavService } from './sidenav.service';
import { NavigationEntry } from './navigation-entry';

@Component({
  selector: 'eco-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent implements OnInit {
  public menuItems!: NavigationEntry[];

  constructor(private sideNavService: SidenavService) {}

  ngOnInit(): void {
    this.menuItems = this.sideNavService.menuItems;
  }
}
