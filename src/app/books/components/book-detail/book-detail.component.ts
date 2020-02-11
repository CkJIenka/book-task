import { Component, OnInit } from '@angular/core';

import { BooksListService } from '../../services/books-list.service';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {

  protected book: object;

  constructor(
    private _bookListService: BooksListService,
  ) { }

  public ngOnInit(): void {
    // this.getBook();
  }

}
