import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksView } from './view/books.view';

const routes: Routes = [
  { path: '', component: BooksView },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {
}
