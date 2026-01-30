import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { version } from '../../../../../package.json';
import { SessionStorage } from 'ngx-webstorage';

@Component({
  selector: 'eco-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public version = version;

  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

  sidenavTitle = 'Admin Dashboard';

  @SessionStorage() metricSelcted?: any;
  @SessionStorage() menuSelcted?: any;
  @SessionStorage() isDashboardPanel = false;
  @SessionStorage() isVisitorPanel = false;
  @SessionStorage() isSalesPanel = false;
  @SessionStorage() isCatalogPanel = false;
  @SessionStorage() isReviewsPanel = false;
  @SessionStorage() isClaimsPanel = false;
  @SessionStorage() isMessagesPanel = false;
  @SessionStorage() isConfigurationPanel = false;

  @ViewChild('mainSidenav') mainSideNav!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver) {}

  toggleSidenav(): void {
    if (this.mainSideNav) {
      this.mainSideNav.toggle();
    }
  }

  initMenuPanels(): void {
    this.isDashboardPanel = this.menuSelcted.includes('dashboard');
    this.isVisitorPanel = this.menuSelcted.includes('visitor');
    this.isSalesPanel = this.menuSelcted.includes('sales');
    this.isCatalogPanel = this.menuSelcted.includes('catalog');
    this.isReviewsPanel = this.menuSelcted.includes('reviews');
    this.isClaimsPanel = this.menuSelcted.includes('claims');
    this.isMessagesPanel = this.menuSelcted.includes('messages');
    this.isConfigurationPanel = this.menuSelcted.includes('configuration');
  }

  onMenuSelected(item: any): void {
    this.menuSelcted = item;
    this.initMenuPanels();
  }

  onMetricSelected(): void {}
}
