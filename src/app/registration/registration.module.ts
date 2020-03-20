import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './components/registration.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RegistrationRoutingModule,
  ],
  declarations: [
    RegistrationComponent,
  ],
})
export class RegistrationModule { }
