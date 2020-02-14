import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsView } from './view/authors/authors.view';
import { AuthorDetailView } from './view/author-detail/author-detail.view';
import { AuthorFormView } from './view/author-form/author-form.view';

const routes: Routes = [
    {
      path: 'create',
      component: AuthorFormView,
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
          component: AuthorFormView,
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
