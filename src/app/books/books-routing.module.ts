import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookFormEditView } from '@app/books/view/book-form-edit/book-form-edit.view';
import { BookDetailComponent } from '@app/books/components/book-detail/book-detail.component';

import { BooksView } from './view/books/books.view';

const routes: Routes = [
  {
    path: ':id',
    children: [
      {
        path: '',
        component: BookDetailComponent,
      },
      {
        path: 'edit',
        component: BookFormEditView,
      },
    ],
  },
  {
    path: '',
    component: BooksView,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {
}
