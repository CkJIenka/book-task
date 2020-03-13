import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TextMaskModule } from 'angular2-text-mask';
import {
  MatInputModule, MatButtonModule, MatCardModule,
  MatExpansionModule, MatDatepickerModule, MatNativeDateModule,
  MatTableModule,
} from '@angular/material';

import { PaginationComponent } from './components/pagination/pagination.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { AuthorFormReactiveComponent } from './components/author-form-reactive/author-form-reactive.component';
import { AuthorFormTemplateComponent } from './components/author-form-template/author-form-template.component';
import { PricesComponent } from './components/prices/prices.component';

@NgModule({
  declarations: [
    PaginationComponent,
    AuthorFormComponent,
    BookFormComponent,
    AuthorFormReactiveComponent,
    AuthorFormTemplateComponent,
    PricesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TextMaskModule,
    MatTableModule,
  ],
  exports: [
    PaginationComponent,
    AuthorFormComponent,
    BookFormComponent,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    TextMaskModule,
    MatTableModule,
    PricesComponent,
  ],
})
export class SharedModule { }
