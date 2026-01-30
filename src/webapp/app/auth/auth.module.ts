import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LanguageMenuModule } from '../home/language-menu/language-menu.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule, RouterModule, LanguageMenuModule],
})
export class AuthModule {}
