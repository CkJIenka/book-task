import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog } from '@angular/material';

import { BooksListService } from '../../services/books-list.service';
import { IBook } from '../../../interfaces/books';
import { BookDetailComponent } from '../book-detail/book-detail.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent implements OnInit, OnDestroy {

  public requestMeta: number;
  public books: IBook[];
  private _destroy$: Subject<any> = new Subject<any>();

  constructor(
    private _bookListService: BooksListService,
    private _dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(page: number = 1): void {
    this._bookListService.getBooks(page)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response) => {
        this.books = response.books;
        this.requestMeta = response.meta.pages;
      });
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

