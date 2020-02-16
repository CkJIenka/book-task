import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';
import { AuthorsView } from './view/authors/authors.view';
import { AuthorDetailView } from './view/author-detail/author-detail.view';
import { AuthorFormCreateView } from './view/author-form-create/author-form-create.view';
import { AuthorFormEditView } from './view/author-form-edit/author-form-edit.view';
import { ToasterComponent } from './components/toaster/toaster.component';

@NgModule({
  declarations: [
    AuthorsListComponent,
    AuthorDetailComponent,
    AuthorsView,
    AuthorDetailView,
    AuthorFormCreateView,
    AuthorFormEditView,
    ToasterComponent,
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    SharedModule,
  ],
})
export class AuthorsModule { }
