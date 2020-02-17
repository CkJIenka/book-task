import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { BooksListService } from '../../services/books-list.service';
import { IBook } from '../../../shared/interfaces/books';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {

  public book: IBook;

  constructor(
    private _bookListService: BooksListService,
    private _dialogRef: MatDialogRef<BookDetailComponent>,
    @Inject(MAT_DIALOG_DATA) data: IBook,
  ) {
    this.book = data;
  }

  public ngOnInit(): void {}

  public closeBookDescription(): void {
    this._dialogRef.close();
  }

}
