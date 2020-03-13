import {
  Component, EventEmitter, OnDestroy, OnInit, Output, Input,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { customDateFormValidator } from '@app/shared/utils/custom-date-form-validator';
import { PHONE_NUMBER_MASK } from '@app/shared/utils/text-mask';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
})
export class BookSearchComponent implements OnInit, OnDestroy {

  @Input()
  public searchValue: object;

  @Output()
  public readonly fullSearchValue = new EventEmitter<object>();

  public bookSearchForm: FormGroup;
  public phoneNumberMask = PHONE_NUMBER_MASK;
  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _formBuilder: FormBuilder,
  ) { }

  public get price(): AbstractControl | null {
    return this.bookSearchForm.get('price');
  }
  public get priceFrom(): AbstractControl | null {
    return this.bookSearchForm.get('price.priceFrom');
  }
  public get priceTo(): AbstractControl | null {
    return this.bookSearchForm.get('price.priceTo');
  }
  public get dateControl(): AbstractControl | null {
    return this.bookSearchForm.get('date');
  }
  public get dateStart(): AbstractControl | null {
    return this.bookSearchForm.get('date.dateStart');
  }
  public get dateEnd(): AbstractControl | null {
    return this.bookSearchForm.get('date.dateEnd');
  }

  public ngOnInit(): void {
    this._initForm();
    if (this.searchValue) {
      this._patchFormValue(this.searchValue);
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public setSearchValue(): void {
    this.fullSearchValue.emit(this.bookSearchForm.getRawValue());
  }

  public setPriceSearchValue(price: FormGroup): void {
    this.priceFrom.setValue(price.controls.priceFrom.value);
    if (price.controls.priceFrom.invalid) {
      this.priceFrom.setErrors({ invalid: true });
    }
    this.priceTo.setValue(price.controls.priceTo.value);
    if (price.controls.priceTo.invalid) {
      this.priceTo.setErrors({ invalid: true });
    }
  }

  private _initForm(): void {
    this.bookSearchForm = this._formBuilder.group({
      title: '',
      price: this._formBuilder.group({
        priceFrom: [null, Validators.min(0)],
        priceTo: [null, Validators.min(0)],
      }),
      date: this._formBuilder.group({
        dateStart: null,
        dateEnd: null,
      }, { validators: customDateFormValidator() }),
      phoneNumber: null,
    });
  }

  private _patchFormValue(searchValue: any): void {
    this.bookSearchForm.patchValue({
      title: searchValue.title_cont,
      price: {
        priceFrom: searchValue.price_from,
        priceTo: searchValue.price_to,
      },
      date: {
        dateStart: !!searchValue.date_start ? new Date(searchValue.date_start) : null,
        dateEnd: !!searchValue.date_end ? new Date(searchValue.date_end) : null,
      },
    });
  }

}
