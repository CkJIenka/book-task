import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IBook } from '@app/shared/interfaces/books';
import { BookFormEditService } from '@app/books/services/book-form-edit.service';

import { ToastrService } from '@libs/toastr/services/toastr.service';


@Component({
  templateUrl: './book-form-edit.view.html',
  styleUrls: ['./book-form-edit.view.css'],
})
export class BookFormEditView implements OnInit {

  public currentBook: IBook;
  private _id = +this._route.snapshot.paramMap.get('id');
  private _destroy$: Subject<any> = new Subject<any>();

  constructor(
    private _bookFormEditService: BookFormEditService,
    private _route: ActivatedRoute,
    private _location: Location,
    private _toastrService: ToastrService,
  ) { }

  public ngOnInit(): void {}

  public bookEdit(book: IBook): void {
    this._bookFormEditService.changeBook(book, this._id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
    this._toastrService.open('Information about book was successfully changed.');
    setTimeout(() => {
      this.goBack();
    }, 2000);
  }

  public goBack(): void {
    this._location.back();
  }

}
