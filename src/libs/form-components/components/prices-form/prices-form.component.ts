import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-prices-form',
  templateUrl: './prices-form.component.html',
  styleUrls: ['./prices-form.component.scss'],
})

export class PricesFormComponent implements OnInit {

  @Input()
  public priceValue: FormGroup;

  @Output()
  public readonly priceSearchValue = new EventEmitter<FormGroup['controls']>();

  public price: FormGroup;
  private _destroy$ = new Subject<void>();
  private _previousPriceValFrom: number;
  private _previousPriceValTo: number;

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  public get priceFrom(): AbstractControl | null {
    return this.price.get('priceFrom');
  }
  public get priceTo(): AbstractControl | null {
    return this.price.get('priceTo');
  }

  public ngOnInit(): void {
    this._initForm();
    this._subPriceFromChanges();
    this._subPriceToChanges();
    this._patchPriceValue();
    this.price.valueChanges
      .subscribe((val) =>
        this.priceSearchValue.emit(this.price.controls),
      );
  }

  private _initForm(): void {
    this.price = this._formBuilder.group({
      priceFrom: [null, Validators.min(0)],
      priceTo: [null, Validators.min(0)],
    });
  }

  private _patchPriceValue(): void {
    this.price.markAllAsTouched();
    this.price.patchValue({
      priceFrom: this.priceValue.controls.priceFrom.value,
      priceTo: this.priceValue.controls.priceTo.value,
    });
  }

  private _subPriceFromChanges(): void {
    this.priceFrom.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this._destroy$),
     )
      .subscribe((val) => {
        if (this._previousPriceValFrom !== val) {
          if (val) {
            this.priceTo.setValidators([
              Validators.min(val),
              Validators.required,
            ]);
            this.priceTo.updateValueAndValidity();
          } else {
            this.priceTo.setValidators(Validators.min(0));
            this.priceTo.updateValueAndValidity();
          }
        }
        this._previousPriceValFrom = val;
      });
  }

  private _subPriceToChanges(): void {
    this.priceTo.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this._destroy$),
      )
      .subscribe((val) => {
        if (this._previousPriceValTo !== val) {
          if (val) {
            this.priceFrom.setValidators([
              Validators.max(val),
              Validators.required,
              Validators.min(0),
            ]);
            this.priceFrom.updateValueAndValidity();
          } else {
            this.priceFrom.setValidators(Validators.min(0));
            this.priceFrom.updateValueAndValidity();
          }
        }
        this._previousPriceValTo = val;
      });
  }

}
