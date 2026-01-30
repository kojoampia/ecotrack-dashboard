import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first, switchMap, take, tap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { LANGUAGES } from 'app/core/language/language.constants';
import { validateEmail } from 'app/shared/util/validators';

@Component({
  selector: 'eco-edit-account',
  templateUrl: './edit-account.component.html',
})
export class EditAccountComponent implements OnInit {
  public accountForm!: FormGroup;

  public languages = LANGUAGES;

  public account$?: Observable<Account | null>;

  constructor(private accountService: AccountService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.account$ = this.accountService.identity();
    this.createForm();
    this.account$
      .pipe(
        first(),
        tap(value => {
          this.fillForm(value);
        })
      )
      .subscribe();
  }

  public updateAccount(): void {
    if (this.accountForm.valid) {
      (this.account$ || EMPTY)
        .pipe(
          take(1),
          switchMap((value: Account | null) => {
            if (value) {
              const account: Account = this.accountForm.value || {};
              value.firstName = account.firstName;
              value.lastName = account.lastName;
              value.langKey = account.langKey;
            }
            return this.accountService.update(value as Account);
          })
        )
        .subscribe();
    }
  }

  private createForm(): void {
    this.accountForm = this.fb.group({
      firstName: [''],
      lastName: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required, validateEmail]],
      langKey: ['en'],
      authorities: [{ value: '', disabled: true }],
    });
  }

  private fillForm(value: Account | null): void {
    this.accountForm.patchValue(value || {});
  }
}
