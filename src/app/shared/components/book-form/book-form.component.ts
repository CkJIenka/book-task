import {
  Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DatePipe, Location } from '@angular/common';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { IBook } from '@app/shared/interfaces/books/books.interface';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  providers: [DatePipe],
})
export class BookFormComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  public book: IBook;

  @Output()
  public readonly bookSubmitted = new EventEmitter<object>();

  public bookForm: FormGroup;
  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _location: Location,
    private readonly _datePipe: DatePipe,
  ) { }

  public get title(): AbstractControl | null {
    return this.bookForm.get('title');
  }

  public get description(): AbstractControl | null {
    return this.bookForm.get('description');
  }

  public get datePublishing(): AbstractControl | null {
    return this.bookForm.get('datePublishing');
  }

  public get phoneNumber(): AbstractControl | null {
    return this.bookForm.get('phoneNumber');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.book.currentValue !== changes.book.previousValue) {
      this._setInputValue(changes.book.currentValue);
    }
  }

  public ngOnInit(): void {
    this._initForm();
    this._inputChange();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(book: IBook): void {
    if (this.bookForm.invalid) {
      return;
    }
    book.datePublishing = this._datePipe.transform(book.datePublishing, 'yyyy-MM-dd');
    book.phoneNumber = book.phoneNumber.replace(/[()-]/g, '');
    this.bookSubmitted.emit(book);
    this.bookForm.reset();
  }

  public clearBookForm(): void {
    this.bookForm.reset();
  }

  public goBack(): void {
    this._location.back();
  }

  private _initForm(): void {
    this.bookForm = this._formBuilder.group({
      title: [
        '',
        Validators.required,
      ],
      description: [
        { value: '', disabled: true },
        Validators.required,
      ],
      datePublishing: [
        { value: null, disabled: true },
        Validators.required,
      ],
      phoneNumber: [
        { value: null, disabled: true },
        Validators.required,
      ],
    });
  }

  private _setInputValue(book: IBook): void {
    this.title.patchValue(book.title);
    this.description.patchValue(book.description);
  }

  private _inputChange(): void {
    this.title.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        debounceTime(200),
      )
      .subscribe((val) => {
        if (val) {
          if (!this.description.enabled) {
            this.description.enable();
          }
          if (!this.datePublishing.enabled) {
            this.datePublishing.enable();
          }
          if (!this.phoneNumber.enabled) {
            this.phoneNumber.enable();
          }
        } else {
          this.phoneNumber.disable();
          this.datePublishing.disable();
          this.description.disable();
        }
      });
  }

}
