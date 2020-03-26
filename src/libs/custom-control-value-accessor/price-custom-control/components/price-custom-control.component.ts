import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-price-custom-control',
  templateUrl: './price-custom-control.component.html',
  styleUrls: ['./price-custom-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriceCustomControlComponent),
      multi: true,
    },
  ],
})
export class PriceCustomControlComponent implements ControlValueAccessor {

  public val: string;

  get value(): string {
    return this.val;
  }

  set value(val: string) {
    this.val = val;
    this.onChange(val);
    this.onTouched(val);
  }

  // constructor(private _control: NgControl) {
  //   // this._control.control.setValidators(myValidator);
  // }

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
