import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog } from '@angular/material';

import { BooksListService } from '@app/books/services/books-list.service';
import { IBook } from '@app/shared/interfaces/books/books.interface';
import { IMeta } from '@app/shared/interfaces/meta.interface';
import { IBooksQueryParams } from '@app/shared/interfaces/books/books.query-params.interface';

import { BookDetailComponent } from '../book-detail/book-detail.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
  providers: [DatePipe],
})
export class BooksListComponent implements OnInit, OnDestroy {

  public requestMeta: IMeta;
  public books: IBook[];
  public title: string;
  public messageError = 'No search results found.';
  public queryParams: IBooksQueryParams;
  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _bookListService: BooksListService,
    private readonly _datePipe: DatePipe,
  ) { }

  public ngOnInit(): void {
    this._route.queryParams.subscribe((params: IBooksQueryParams) => {
      this.queryParams = { ...params };
    });
    this.getBooks(this.queryParams);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getBooks(searchParams: IBooksQueryParams): void {
    this._bookListService.getBooks(searchParams)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response) => {
        this.books = response.books;
        this.requestMeta = response.meta;
      });
  }

  public filterBooks(titleValue: string): void {
    this.queryParams.page = 1;
    this.queryParams.title_cont = titleValue;
    this.getBooks(this.queryParams);
    this._router.navigate([], {
      relativeTo: this._route,
      queryParamsHandling: 'merge',
      queryParams: {
        page: '1',
        title_cont: titleValue,
      },
    });
  }

  public fullFilterBooks(searchValue: any): void {
    this.queryParams = {
      page: 1,
      title_cont: searchValue.title,
      price_from: searchValue.price.priceFrom,
      price_to: searchValue.price.priceTo,
      date_start: searchValue.date.dateStart,
      date_end: searchValue.date.dateEnd,
    };
    this.getBooks(this.queryParams);
    this._router.navigate([], {
      relativeTo: this._route,
      queryParamsHandling: 'merge',
      queryParams: {
        page: '1',
        title_cont: !!searchValue.title ? searchValue.title : null,
        price_from: searchValue.price.priceFrom,
        price_to: searchValue.price.priceTo,
        date_start: this._datePipe.transform(
            searchValue.date.dateStart,
            'MM-dd-yyyy',
            ),
        date_end: this._datePipe.transform(
            searchValue.date.dateEnd,
            'MM-dd-yyyy',
        ),
        genres: searchValue.bookGenres.length > 0 ? searchValue.bookGenres.join() : null,
      },
    });
  }

  public changeBooksPage(pageNumber: number): void {
    this.queryParams.page = pageNumber;
    this.getBooks(this.queryParams);
  }

  public openBookDetail(book: IBook): void {
    this._dialog.open(BookDetailComponent, {
      autoFocus: true,
      data: book,
    });
  }

}

