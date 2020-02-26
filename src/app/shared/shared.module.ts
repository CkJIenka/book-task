import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatInputModule, MatButtonModule, MatCardModule } from '@angular/material';

import { PaginationComponent } from './components/pagination/pagination.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { AuthorFormReactiveComponent } from './components/author-form-reactive/author-form-reactive.component';
import { AuthorFormTemplateComponent } from './components/author-form-template/author-form-template.component';

@NgModule({
  declarations: [
    PaginationComponent,
    AuthorFormComponent,
    BookFormComponent,
    AuthorFormReactiveComponent,
    AuthorFormTemplateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
  ],
  exports: [
    PaginationComponent,
    AuthorFormComponent,
    BookFormComponent,
    MatButtonModule,
  ],
})
export class SharedModule { }
