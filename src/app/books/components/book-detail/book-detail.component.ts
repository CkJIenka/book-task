import { Component, OnInit } from '@angular/core';

import { BookListService } from '../../services/book-list.service';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {

  protected book: object;

  constructor(
    private _bookListService: BookListService,
  ) { }

  public ngOnInit(): void {
    // this.getBook();
  }

}
