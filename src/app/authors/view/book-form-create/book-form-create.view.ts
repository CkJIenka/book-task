import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IBook } from '@app/shared/interfaces/books';
import { BookFormCreateService } from '@app/authors/services/book-form-create.service';

import { ToastrService } from '@libs/toastr/services/toastr.service';

@Component({
  templateUrl: './book-form-create.view.html',
  styleUrls: ['./book-form-create.view.css'],
})
export class BookFormCreateView implements OnInit, OnDestroy {

  private _destroy$: Subject<any> = new Subject<any>();
  private _id = +this._route.snapshot.paramMap.get('id');

  constructor(
    private _bookFormCreateService: BookFormCreateService,
    private _location: Location,
    private _toastrService: ToastrService,
    private _route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
  }

  public bookSave(book: IBook): any {
    this._bookFormCreateService.postBook(book, this._id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe();
    this._toastrService.open('Book was successfully added.');
    setTimeout(() => {
      this.goBack();
    }, 2000);
  }

  public goBack(): void {
    this._location.back();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
