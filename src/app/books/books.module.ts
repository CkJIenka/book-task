import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material';

import { SharedModule } from '@app/shared';

import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksRoutingModule } from './books-routing.module';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BooksView } from './view/books/books.view';
import { BookFormEditView } from './view/book-form-edit/book-form-edit.view';
import { BookSearchComponent } from './components/book-search/book-search.component';

import { SearchModule } from '@libs/search';
import { CustomControlModule } from '@libs/custom-control-value-accessor'

@NgModule({
  declarations: [
    BooksListComponent,
    BookDetailComponent,
    BooksView,
    BookFormEditView,
    BookSearchComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule,
    MatDialogModule,
    SearchModule,
    CustomControlModule,
  ],
  exports: [
  ],
  entryComponents: [
    BookDetailComponent,
  ],
})
export class BooksModule { }
