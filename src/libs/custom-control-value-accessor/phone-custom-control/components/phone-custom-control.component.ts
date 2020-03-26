import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { PHONE_NUMBER_MASK } from '@app/shared/utils/text-mask';

@Component({
  selector: 'app-phone-custom-control',
  templateUrl: './phone-custom-control.component.html',
  styleUrls: ['./phone-custom-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneCustomControlComponent),
      multi: true,
    },
  ],
})
export class PhoneCustomControlComponent implements ControlValueAccessor {

  public val: string;
  public phoneNumberMask = PHONE_NUMBER_MASK;

  get value(): string {
    return this.val;
  }

  set value(val: string) {
    this.val = val;
    this.onChange(val.replace(/[-_()]/g, ''));
    this.onTouched(val.replace(/[-_()]/g, ''));
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
