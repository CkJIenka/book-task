import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationView } from './view/registration/registration.view';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RegistrationRoutingModule,
  ],
  declarations: [
    RegistrationComponent,
    RegistrationView,
  ],
})
export class RegistrationModule { }
