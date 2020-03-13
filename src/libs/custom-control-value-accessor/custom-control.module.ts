import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material';

import { PriceCustomControlComponent } from './price-custom-control/price-custom-control.component';

@NgModule({
  declarations: [
    PriceCustomControlComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PriceCustomControlComponent,
  ],
})
export class CustomControlModule { }
