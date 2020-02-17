import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material';

import { SharedModule } from '@app/shared';

import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksRoutingModule } from './books-routing.module';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BooksView } from './view/books/books.view';
import { BookFormEditView } from './view/book-form-edit/book-form-edit.view';

@NgModule({
  declarations: [
    BooksListComponent,
    BookDetailComponent,
    BooksView,
    BookFormEditView,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule,
    MatDialogModule,
  ],
  exports: [
  ],
  entryComponents: [
    BookDetailComponent,
  ],
})
export class BooksModule { }
