import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsListComponent } from './components/authors-list/authors-list.component';

const routes: Routes = [
  { path: 'authors', component: AuthorsListComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AuthorsRoutingModule { }
