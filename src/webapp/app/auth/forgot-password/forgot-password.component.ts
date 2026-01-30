import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PasswordResetInitService } from './password-reset-init.service';
import { validateEmail } from '../../shared/util/validators';

@Component({
  selector: 'eco-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private passwordResetInitService: PasswordResetInitService) {}

  public ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, validateEmail]],
    });
  }

  public forgotPassword(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      this.passwordResetInitService.save(email).pipe(first()).subscribe();
    }
  }
}
