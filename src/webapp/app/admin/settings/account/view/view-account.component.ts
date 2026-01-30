import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PROFILE_USER_URL } from 'app/app.constants';
import { PasswordService } from '../../change-password/password.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'eco-view-account',
  templateUrl: './view-account.component.html',
})
export class ViewAccountComponent implements OnInit {
  public defaultUserImage = PROFILE_USER_URL;
  public account$?: Observable<Account | null>;
  public profileImageUrl?: string;

  constructor(private passwordService: PasswordService, private accountService: AccountService) {}

  public ngOnInit(): void {
    this.account$ = this.accountService.identity();
    this.profileImageUrl = this.accountService.getImageUrl();
  }
}
