import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../core/login/login.service';
import { Account } from '../../core/user/account.model';
import { AccountService } from '../../core/auth/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'eco-setting-menu',
  templateUrl: './setting-menu.component.html',
  styleUrls: ['./setting-menu.component.scss'],
})
export class SettingMenuComponent implements OnInit {
  public account!: Account | null;
  public imageUrl!: string;

  constructor(private router: Router, private loginService: LoginService, private accountService: AccountService) {}

  public ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(first())
      .subscribe(account => {
        this.account = account;
      });
    this.imageUrl = this.accountService.getImageUrl();
  }

  public logout(): void {
    this.loginService.logout();
    this.router.navigate(['/auth/login']);
  }
}
