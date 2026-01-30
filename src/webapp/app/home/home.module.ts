import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageMenuModule } from './language-menu/language-menu.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './home.route';
import { AdminMenuModule } from './admin-menu/admin-menu.module';
import { NgJhipsterModule } from 'ng-jhipster';
import { AdminDashboardSharedModule } from '../shared/shared.module';
import { SettingMenuModule } from './setting-menu/setting-menu.module';
import { MatCardModule } from '@angular/material/card';
import { SidenavModule } from './sidenav/sidenav.module';
import { ChatMenuModule } from './chat-menu/chat-menu.module';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES),
    LanguageMenuModule,
    TranslateModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AdminMenuModule,
    NgJhipsterModule,
    AdminDashboardSharedModule,
    SettingMenuModule,
    MatCardModule,
    SidenavModule,
    ChatMenuModule,
  ],
})
export class HomeModule {}
