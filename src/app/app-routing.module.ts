import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  {
    path: 'login',
    loadChildren: () => import('./authorization/authorization.module')
      .then((m) => m.AuthorizationModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
