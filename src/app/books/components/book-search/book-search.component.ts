import {
  Component, EventEmitter, OnDestroy, OnInit, Output, Input,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { Subject } from 'rxjs';

import { MatAutocompleteSelectedEvent } from '@angular/material';

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
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public genres = [];
  public allGenres = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Fantasy' },
    { id: 4, name: 'Science' },
    { id: 5, name: 'Comedy' },
  ];
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

  public removeGenreFromSelect(genre: string): void {
    const index = this.genres.indexOf(genre);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

  public selectedBookGenre(event: MatAutocompleteSelectedEvent): void {
    if (this.genres.indexOf(event.option.value) === -1) {
      this.genres.push(event.option.value.name);
    }
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
      phoneNumber: null,
      bookGenres: '',
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
