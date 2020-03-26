import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IBook } from '@app/shared/interfaces/books/books.interface';
import { BookFormEditService } from '@app/core/services/book-form-edit.service';

import { ToastrService } from '@libs/toastr/services/toastr.service';


@Component({
  templateUrl: './book-form-edit.view.html',
  styleUrls: ['./book-form-edit.view.scss'],
})
export class BookFormEditView implements OnInit {

  public currentBook: IBook;
  private _id = +this._route.snapshot.paramMap.get('id');
  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _location: Location,
    private readonly _bookFormEditService: BookFormEditService,
    private readonly _toastrService: ToastrService,
  ) { }

  public ngOnInit(): void {
    // this._getBook();
  }

  public bookEdit(book: IBook): void {
    this._bookFormEditService.changeBook(this._id, book)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this._toastrService.open('Data was successfully added.');
          setTimeout(() => {
            this.goBack();
          }, 2000);
        },
      });
  }

  public goBack(): void {
    this._location.back();
  }

  private _getBook(): void {
    this._bookFormEditService.getBook(this._id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response) => {
        this.currentBook = response;
      });
  }

}
