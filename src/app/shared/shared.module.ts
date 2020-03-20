import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  MatInputModule, MatButtonModule, MatCardModule,
  MatExpansionModule, MatDatepickerModule, MatNativeDateModule,
  MatTableModule, MatChipsModule, MatIconModule,
  MatAutocompleteModule,
} from '@angular/material';

import { PaginationComponent } from './components/pagination/pagination.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { AuthorFormReactiveComponent } from './components/author-form-reactive/author-form-reactive.component';
import { AuthorFormTemplateComponent } from './components/author-form-template/author-form-template.component';
import { PricesFormComponent } from './components/prices-form/prices-form.component';
import { DatesFormComponent } from './components/dates-form/dates-form.component';

import { CustomControlModule } from '@libs/custom-control-value-accessor';

@NgModule({
  declarations: [
    PaginationComponent,
    AuthorFormComponent,
    BookFormComponent,
    AuthorFormReactiveComponent,
    AuthorFormTemplateComponent,
    PricesFormComponent,
    DatesFormComponent,
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
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    CustomControlModule,
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
    MatTableModule,
    PricesFormComponent,
    DatesFormComponent,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatCardModule,
  ],
})
export class SharedModule { }
