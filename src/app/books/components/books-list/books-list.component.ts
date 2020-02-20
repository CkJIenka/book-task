import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog } from '@angular/material';

import { BooksListService } from '@app/books/services/books-list.service';
import { IBook } from '@app/shared/interfaces/books';
import { IMeta } from '@app/shared/interfaces/meta';

import { BookDetailComponent } from '../book-detail/book-detail.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit, OnDestroy {

  public requestMeta: IMeta;
  public books: IBook[];
  public title: string;
  private _destroy$ = new Subject<void>();

  constructor(
    private _bookListService: BooksListService,
    private _dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(page: number = 1, title: string = ''): void {
    this.title = title;
    this._bookListService.getBooks(page, title)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response) => {
        this.books = response.books;
        this.requestMeta = response.meta;
      });
  }

  public filterBooks(page: number = 1, title: string = ''): void {
    this.getBooks(page, title);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public openBookDetail(book: IBook): void {
    this._dialog.open(BookDetailComponent, {
      autoFocus: true,
      data: book,
    });
  }

}

