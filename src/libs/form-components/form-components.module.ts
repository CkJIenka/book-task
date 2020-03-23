import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule, MatDatepickerModule } from '@angular/material';

import { PricesFormComponent } from './components/prices-form/prices-form.component';
import { DatesFormComponent } from './components/dates-form/dates-form.component';

@NgModule({
  declarations: [
    PricesFormComponent,
    DatesFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  exports: [
    PricesFormComponent,
    DatesFormComponent,
  ],
})
export class FormComponentsModule { }
