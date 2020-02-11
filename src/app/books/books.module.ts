import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksRoutingModule } from './books-routing.module';
import { PaginationComponent } from './components/pagination/pagination.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

@NgModule({
  declarations: [
    BooksListComponent,
    PaginationComponent,
    BookDetailComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
  ],
})
export class BooksModule { }
