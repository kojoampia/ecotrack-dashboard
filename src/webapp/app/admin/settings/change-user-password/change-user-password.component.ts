import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserPasswordService } from './user-password.service';
import { mustMatch, validatePassword } from '../../../shared/util/validators';

@Component({
  selector: 'eco-change-user-password',
  templateUrl: './change-user-password.component.html',
})
export class ChangeUserPasswordComponent implements OnInit {
  public passwordForm!: FormGroup;

  constructor(private passwordService: UserPasswordService, private route: ActivatedRoute, private fb: FormBuilder) {}

  public get newPasswordRepeat(): AbstractControl {
    return this.passwordForm.get('newPasswordRepeat') as AbstractControl;
  }

  public ngOnInit(): void {
    this.createForm();

    this.route.data.pipe(first()).subscribe(({ user }) => {
      this.passwordForm.patchValue({ email: user.email });
    });
  }

  public updatePassword(): void {
    if (this.passwordForm.valid) {
      this.passwordService
        .save(this.passwordForm.get('newPassword')?.value, this.passwordForm.get(['email'])!.value)
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
        newPassword: ['', [Validators.required, validatePassword()]],
        newPasswordRepeat: [''],
      },
      { validator: mustMatch }
    );
  }
}
