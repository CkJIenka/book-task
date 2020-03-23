import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordsMatchFormValidator(): ValidatorFn {
  return (currentControl: AbstractControl): ValidationErrors | null => {
    const password = currentControl.get('password');
    const confirmPassword = currentControl.get('confirmPassword');

    if (
        password.value !== null &&
        confirmPassword.value !== null &&
        password.value !== confirmPassword.value
        ) {
      return {
        'not-same': {},
      };
    }

    return null;
  };
}
