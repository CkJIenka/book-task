import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizationView } from './view/authorization/authorization.view';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationView,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule { }
