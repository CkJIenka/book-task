import {
  Component, EventEmitter, OnDestroy, OnInit, Output, Input,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit, OnDestroy {

  @Input()
  public searchValue: object;

  @Output()
  public readonly fullSearchValue = new EventEmitter<object>();

  public bookSearchForm: FormGroup;
  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _formBuilder: FormBuilder,
  ) { }

  public get priceControl(): AbstractControl | null {
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
  public get phoneNumber(): AbstractControl | null {
    return this.bookSearchForm.get('phoneNumber');
  }
  public get bookGenres(): AbstractControl | null {
    return this.bookSearchForm.get('bookGenres');
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

  public setPriceSearchValue(price: any): void {
    this.priceFrom.setValue(price.priceFrom.value);
    if (price.priceFrom.invalid) {
      this.priceFrom.setErrors({ invalid: true });
    }
    this.priceTo.setValue(price.priceTo.value);
    if (price.priceTo.invalid) {
      this.priceTo.setErrors({ invalid: true });
    }
  }

  public setDateSearchValue(date: FormGroup): void {
    this.dateStart.setValue(date.controls.dateStart.value);
    if (date.invalid) {
      this.dateStart.setErrors({ invalid: true });
    }
    this.dateEnd.setValue(date.controls.dateEnd.value);
  }

  public clearSearchForm(): void {
    this.bookSearchForm.reset();
  }

  private _initForm(): void {
    this.bookSearchForm = this._formBuilder.group({
      title: '',
      price: this._formBuilder.group({
        priceFrom: null,
        priceTo: null,
      }),
      date: this._formBuilder.group({
        dateStart: null,
        dateEnd: null,
      }),
      phoneNumber: '',
      bookGenres: [{}],
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
      phoneNumber: searchValue.phone_number ? searchValue.phone_number : null,
      bookGenres: !!searchValue.genres ? searchValue.genres.replace(/_/g, ' ').split(',') : [],
    });
  }

}
