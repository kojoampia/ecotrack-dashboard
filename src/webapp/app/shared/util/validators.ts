import { AbstractControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

export function validateEmail(): ValidationErrors | null {
  return (control: AbstractControl) => {
    // eslint-disable-next-line
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const namePatternRegx = new RegExp(pattern);
    if (!control.value) {
      return undefined;
    }
    return Validators.pattern(namePatternRegx)(control);
  };
}

export function validateName(): ValidationErrors | null {
  return (control: AbstractControl) => {
    const pinPatternRegx = new RegExp('^[_.@A-Za-z0-9-]*$');
    if (!control.value) {
      return undefined;
    }
    return Validators.pattern(pinPatternRegx)(control);
  };
}

export function validatePassword(): ValidationErrors | null {
  return (control: AbstractControl) => {
    const pinPatternRegx = new RegExp('^.{4,}$');
    if (!control.value) {
      return undefined;
    }
    return Validators.pattern(pinPatternRegx)(control);
  };
}

export function validatePhone(): ValidationErrors | null {
  return (control: AbstractControl) => {
    const phonePatternRegx = new RegExp('^[0-9+()-]{10,15}$');
    if (!control.value) {
      return undefined;
    }
    return Validators.pattern(phonePatternRegx)(control);
  };
}

export function validateTime(): ValidationErrors | null {
  return (control: AbstractControl) => {
    if (!control.value) {
      return undefined;
    }
    const regX = new RegExp('^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$');
    if (!regX.test(control.value)) {
      return { time: true };
    }
    return undefined;
  };
}

export const mustMatch = (formGroup: FormGroup): ValidationErrors | null => {
  const password = formGroup.get('newPassword');
  const passwordRepeat = formGroup.get('newPasswordRepeat');

  if (passwordRepeat && passwordRepeat.errors && !passwordRepeat.errors.mustMatch) {
    return null;
  }

  if (password?.value !== passwordRepeat?.value) {
    passwordRepeat?.setErrors({ mustMatch: true });
  } else {
    passwordRepeat?.setErrors(null);
  }
  return null;
};
