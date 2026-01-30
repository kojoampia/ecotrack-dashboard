import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from '../../core/login/login.service';
import { Login } from '../../core/login/login.model';
import { validateEmail, validatePassword } from '../../shared/util/validators';
import { LoadingService } from '../../shared/services/loading.service';

@Component({
  selector: 'eco-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  credentials?: Login;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  public ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, validateEmail]],
      password: ['', Validators.compose([Validators.required, validatePassword])],
      rememberMe: [''],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      let remember = this.loginForm.get('rememberMe')?.value;
      remember = remember ? true : false;
      this.credentials = {
        username: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
        rememberMe: remember,
      } as Login;

      this.loadingService.show();
      this.loginService
        .login(this.credentials)
        .pipe(first())
        .subscribe(() => {
          this.loadingService.hide();
          this.router.navigate(['/']);
        });
    }
  }
}
