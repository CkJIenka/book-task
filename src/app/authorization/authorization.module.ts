import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material';

import { SharedModule } from '@app/shared';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './components/authorization.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    SharedModule,
    MatListModule,
  ],
  declarations: [
    AuthorizationComponent,
  ],
})
export class AuthorizationModule { }
