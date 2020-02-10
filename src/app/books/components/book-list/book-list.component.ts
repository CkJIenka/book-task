import { Component, OnInit, OnDestroy } from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BookListService } from '../../services/book-list.service';
import { IBook } from '../../../interfaces/books';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnDestroy {

  public pagesData: number;
  public books: IBook[];
  protected destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    protected bookListService: BookListService,
  ) { }

  public ngOnInit(): void {
    this.getBook();
  }

  public getBook(): void {
    this.bookListService.getBooks()
      .pipe(
        takeUntil(this.destroy),
      )
      .subscribe((response) => {
        this.books = response.books;
        this.pagesData = response.meta.pages;
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  public changePage(page: number): void {
    this.bookListService.changePage(page)
      .subscribe((response) => {
        this.books = response.books;
        this.pagesData = response.meta.pages;
      });
  }

}

