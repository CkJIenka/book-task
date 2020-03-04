import {
  Component, EventEmitter, OnDestroy, OnInit, Output, Input,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { customDateFormValidator } from '@app/shared/utils/custom-date-form-validator';

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
  private _destroy$ = new Subject<void>();
  private _previousPriceValFrom: number;
  private _previousPriceValTo: number;

  constructor(
    private readonly _formBuilder: FormBuilder,
  ) { }

  public get priceFrom(): AbstractControl | null {
    return this.bookSearchForm.get('priceFrom');
  }
  public get priceTo(): AbstractControl | null {
    return this.bookSearchForm.get('priceTo');
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
    this._subPriceFromChanges();
    this._subPriceToChanges();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public setSearchValue(): void {
    this.fullSearchValue.emit(this.bookSearchForm.getRawValue());
  }

  private _initForm(): void {
    this.bookSearchForm = this._formBuilder.group({
      title: '',
      priceFrom: [null, Validators.min(0)],
      priceTo: [null, Validators.min(0)],
      date: this._formBuilder.group({
        dateStart: null,
        dateEnd: null,
      }, { validators: customDateFormValidator() }),
    });
  }

  private _patchFormValue(searchValue: any): void {
    this.bookSearchForm.patchValue({
      title: searchValue.title_cont,
      priceFrom: searchValue.price_from,
      priceTo: searchValue.price_to,
      date: {
        dateStart: !!searchValue.date_start ? new Date(searchValue.date_start) : null,
        dateEnd: !!searchValue.date_end ? new Date(searchValue.date_end) : null,
      },
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
          this.priceTo.setValidators(Validators.min(val));
          this.priceTo.updateValueAndValidity();
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
          this.priceFrom.setValidators(Validators.max(val));
          this.priceFrom.updateValueAndValidity();
        }
        this._previousPriceValTo = val;
      });
  }

}
