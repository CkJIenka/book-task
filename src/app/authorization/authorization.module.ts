import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material';

import { SharedModule } from '@app/shared';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './components/aurhorization/authorization.component';
import { AuthorizationView } from './view/authorization/authorization.view';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    SharedModule,
    MatListModule,
  ],
  declarations: [
    AuthorizationView,
    AuthorizationComponent,
  ],
})
export class AuthorizationModule { }
