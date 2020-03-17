import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { PHONE_NUMBER_MASK } from '@app/shared/utils/text-mask';

@Component({
  selector: 'app-phone-custom-control',
  templateUrl: './phone-custom-control.component.html',
  styleUrls: ['./phone-custom-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneCustomControlComponent),
      multi: true,
    },
  ],
})
export class PhoneCustomControlComponent implements ControlValueAccessor {

  public val: any[];
  public phoneNumberMask = PHONE_NUMBER_MASK;

  get value(): any[] {
    return this.val;
  }

  set value(val: any[]) {
    this.val = val;
    this.onChange(val);
    this.onTouched(val);
  }

  public onChange: any = () => {};
  public onTouched: any = () => {};

  public writeValue(val: any): void {
    this.val = val;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
