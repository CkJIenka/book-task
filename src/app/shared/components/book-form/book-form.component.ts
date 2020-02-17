import {
  Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { IBook } from '../../interfaces/books';

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
  private _destroy$: Subject<any> = new Subject<any>();

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  get title(): any {
    return this.bookForm.get('title');
  }
  get description(): any {
    return this.bookForm.get('description');
  }

  public ngOnInit(): void {
    this._initForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.book.currentValue !== changes.book.previousValue) {
      this._setInputValue(changes.book.currentValue);
    }
  }

  public onSubmit(book: IBook): void {
    if (this.bookForm.invalid) {
      return;
    }
    this.bookSubmitted.emit(book);
    this.bookForm.reset();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _initForm(): void {
    this.bookForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private _setInputValue(book: IBook): void {
    this.title.patchValue(book.title);
    this.description.patchValue(book.description);
  }

}
