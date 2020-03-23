import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IBook } from '@app/shared/interfaces/books/books.interface';
import { BookFormCreateService } from '@app/core/book-form-create.service';

import { ToastrService } from '@libs/toastr/services/toastr.service';

@Component({
  templateUrl: './book-form-create.view.html',
  styleUrls: ['./book-form-create.view.css'],
})
export class BookFormCreateView implements OnInit, OnDestroy {

  private _destroy$ = new Subject<void>();
  private _id = +this._route.snapshot.paramMap.get('id');

  constructor(
    private readonly _location: Location,
    private readonly _route: ActivatedRoute,
    private readonly _bookFormCreateService: BookFormCreateService,
    private readonly _toastrService: ToastrService,
  ) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public bookSave(book: IBook): any {
    this._bookFormCreateService.postBook(this._id, book)
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

}
