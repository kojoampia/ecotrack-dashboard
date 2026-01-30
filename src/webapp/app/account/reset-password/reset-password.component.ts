import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetFinishService } from './password-reset-finish.service';
import { mustMatch, validatePassword } from '../../shared/util/validators';

@Component({
  selector: 'eco-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  account!: Account;
  passwordForm!: FormGroup;
  passwordRepeatError = 'New Passwords do not match';
  private key!: string;

  constructor(
    private passwordResetFinishService: PasswordResetFinishService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.createForm();
    this.key = this.activatedRoute.snapshot.queryParams['key'];
  }

  activateAccount(): void {
    if (this.passwordForm.valid) {
      this.passwordResetFinishService
        .save(this.key, this.passwordForm.value)
        .pipe(first())
        .subscribe(() => {
          this.router.navigate(['/auth/login']);
        });
    }
  }

  private createForm(): void {
    this.passwordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, validatePassword]],
        newPasswordRepeat: [''],
      },
      { validator: mustMatch }
    );
  }
}
