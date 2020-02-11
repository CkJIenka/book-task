import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BooksListService } from '../../services/books-list.service';
import { IBook } from '../../../interfaces/books';

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
  ) { }

  public ngOnInit(): void {
    this.getBooks();
  }

  public getBooks(): void {
    this._bookListService.getBooks()
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

  public changePage(page: number): void {
    this._bookListService.changePage(page)
      .subscribe((response) => {
        this.books = response.books;
        this.requestMeta = response.meta.pages;
      });
  }

}

