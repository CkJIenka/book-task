import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customDateFormValidator(): ValidatorFn {
  return (currentControl: AbstractControl): ValidationErrors | null => {
    const dateStart = currentControl.get('dateStart');
    const dateEnd = currentControl.get('dateEnd');

    if (
      dateStart.value !== null &&
      dateEnd.value !== null &&
      dateStart.value.getTime() > dateEnd.value.getTime()) {
      return {
        'date-range-error': {},
      };
    }

    return null;
  };
}
