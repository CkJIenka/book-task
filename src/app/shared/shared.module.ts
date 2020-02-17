import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaginationComponent } from './components/pagination/pagination.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { BookFormComponent } from './components/book-form/book-form.component';

@NgModule({
  declarations: [
    PaginationComponent,
    AuthorFormComponent,
    BookFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    PaginationComponent,
    AuthorFormComponent,
    BookFormComponent,
  ],
})
export class SharedModule { }
