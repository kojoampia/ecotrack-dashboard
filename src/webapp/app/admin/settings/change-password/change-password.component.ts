import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../../../core/auth/account.service';
import { PasswordService } from './password.service';
import { mustMatch, validatePassword } from '../../../shared/util/validators';

@Component({
  selector: 'eco-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  public passwordForm!: FormGroup;

  constructor(
    private passwordService: PasswordService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  public get newPasswordRepeat(): AbstractControl {
    return this.passwordForm.get('newPasswordRepeat') as AbstractControl;
  }

  public ngOnInit(): void {
    this.createForm();
    this.accountService
      .identity()
      .pipe(first())
      .subscribe(account => {
        if (account) {
          this.passwordForm.patchValue({ email: account.email });
        }
      });
  }

  public updatePassword(): void {
    if (this.passwordForm.valid) {
      this.passwordService
        .save(this.passwordForm.get('newPassword')?.value, this.passwordForm.get(['currentPassword'])!.value)
        .pipe(first())
        .subscribe();
    }
  }

  public isInvalid(control: AbstractControl): boolean {
    return control.dirty && control.invalid;
  }

  private createForm(): void {
    this.passwordForm = this.fb.group(
      {
        email: [{ value: '', disabled: true }],
        currentPassword: ['', [Validators.required, validatePassword()]],
        newPassword: ['', [Validators.required, validatePassword()]],
        newPasswordRepeat: [''],
      },
      { validator: mustMatch }
    );
  }
}
