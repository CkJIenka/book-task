import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { MatInputModule, MatButtonModule } from '@angular/material';

import { PaginationComponent } from './components/pagination/pagination.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    PaginationComponent,
    AuthorFormComponent,
    BookFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [
    PaginationComponent,
    AuthorFormComponent,
    BookFormComponent,
    MatButtonModule,
  ],
})
export class SharedModule { }
