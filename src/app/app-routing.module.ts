import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: 'books',
    loadChildren: () => import('./books/books.module')
      .then((m) => m.BooksModule),
  },
  {
    path: 'authors',
    loadChildren: () => import('./authors/authors.module')
      .then((m) => m.AuthorsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
