import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationGuard } from './core/authorization-guard';

const routes: Routes = [
  {
    path: 'books',
    loadChildren: () => import('./books/books.module')
      .then((m) => m.BooksModule),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'authors',
    loadChildren: () => import('./authors/authors.module')
      .then((m) => m.AuthorsModule),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./authorization/authorization.module')
      .then((m) => m.AuthorizationModule),
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module')
      .then((m) => m.RegistrationModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
