import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './components/authorization.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    SharedModule,
  ],
  declarations: [AuthorizationComponent],
})
export class AuthorizationModule { }
