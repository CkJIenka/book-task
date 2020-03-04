import {
  Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IBook } from '@app/shared/interfaces/books/books.interface';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
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
  ) { }

  get title(): any {
    return this.bookForm.get('title');
  }
  get description(): any {
    return this.bookForm.get('description');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.book.currentValue !== changes.book.previousValue) {
      this._setInputValue(changes.book.currentValue);
    }
  }

  public ngOnInit(): void {
    this._initForm();
    if (this.bookForm) {
      this.bookForm.get('title').valueChanges
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((val) => {
          if (val) {
            this.bookForm.get('description').enable();
          } else {
            this.bookForm.get('description').disable();
          }
        });
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(book: IBook): void {
    if (this.bookForm.invalid) {
      return;
    }
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
    });
  }

  private _setInputValue(book: IBook): void {
    this.title.patchValue(book.title);
    this.description.patchValue(book.description);
  }

}
