import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorsView } from './view/authors/authors.view';
import { AuthorDetailView } from './view/author-detail/author-detail.view';
import { AuthorFormCreateView } from './view/author-form-create/author-form-create.view';
import { AuthorFormEditView } from './view/author-form-edit/author-form-edit.view';
import { BookFormCreateView } from './view/book-form-create/book-form-create.view';

import { SearchModule } from '@libs/search';

@NgModule({
  declarations: [
    AuthorsListComponent,
    AuthorDetailComponent,
    AuthorsView,
    AuthorDetailView,
    AuthorFormCreateView,
    AuthorFormEditView,
    BookFormCreateView,
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    SharedModule,
    SearchModule,
  ],
})
export class AuthorsModule { }
