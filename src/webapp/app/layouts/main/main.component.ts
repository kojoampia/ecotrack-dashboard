import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, NavigationError, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

import { AccountService } from 'app/core/auth/account.service';
import { WebsocketAuthService } from 'app/core/auth/websocket-auth.service';
import { Account } from 'app/core/user/account.model';
import { IconsService } from '../../core/custom-icons/icons.service';

@Component({
  selector: 'eco-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  private renderer: Renderer2;

  constructor(
    private accountService: AccountService,
    private titleService: Title,
    private router: Router,
    private translateService: TranslateService,
    private iconsService: IconsService,
    private webService: WebsocketAuthService,
    rootRenderer: RendererFactory2
  ) {
    this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);
  }

  ngOnInit(): void {
    // try to log in automatically
    this.accountService.identity().subscribe(account => {
      this.authenticate(account as Account);
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });

    this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.updateTitle();

      this.renderer.setAttribute(document.querySelector('html'), 'lang', langChangeEvent.lang);
    });

    this.iconsService.registerSvgIcons();
  }

  authenticate(account: Account): void {
    if (!this.webService.isConnected()) {
      this.accountService.authenticate(account);
    }
    setTimeout(() => {
      this.authenticate(account);
    }, 5000);
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : '';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  private updateTitle(): void {
    let pageTitle = this.getPageTitle(this.router.routerState.snapshot.root);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }
    this.translateService.get(pageTitle).subscribe(title => this.titleService.setTitle(title));
  }
}
