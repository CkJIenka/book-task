import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule, MatChipsModule, MatIconModule, MatAutocompleteModule,
} from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';

import { PriceCustomControlComponent } from './price-custom-control/components/price-custom-control.component';
import { GenresCustomControlComponent } from './genres-custom-control/components/genres-custom-control.component';
import { PhoneCustomControlComponent } from './phone-custom-control/components/phone-custom-control.component';

@NgModule({
  declarations: [
    PriceCustomControlComponent,
    GenresCustomControlComponent,
    PhoneCustomControlComponent,
  ],
  imports: [
    CommonModule,
    TextMaskModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  exports: [
    PriceCustomControlComponent,
    GenresCustomControlComponent,
    PhoneCustomControlComponent,
  ],
})
export class CustomControlModule { }
