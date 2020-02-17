import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookFormCreateView } from '@app/authors/view/book-form-create/book-form-create.view';

import { AuthorsView } from './view/authors/authors.view';
import { AuthorDetailView } from './view/author-detail/author-detail.view';
import { AuthorFormCreateView } from './view/author-form-create/author-form-create.view';
import { AuthorFormEditView } from './view/author-form-edit/author-form-edit.view';

const routes: Routes = [
  {
    path: 'create',
    component: AuthorFormCreateView,
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        component: AuthorDetailView,
      },
      {
        path: 'edit',
        component: AuthorFormEditView,
      },
      {
        path: 'new_book',
        component: BookFormCreateView,
      },
    ],
  },
  {
    path: '',
    component: AuthorsView,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule { }
