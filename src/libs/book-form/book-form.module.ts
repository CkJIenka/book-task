import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatInputModule, MatDatepickerModule, MatCardModule, MatButtonModule,
} from '@angular/material';

import { BookFormComponent } from './components/book-form/book-form.component';

import { FormComponentsModule } from '@libs/form-components';
import { CustomControlModule } from '@libs/custom-control-value-accessor';

@NgModule({
  declarations: [
    BookFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    FormComponentsModule,
    MatCardModule,
    CustomControlModule,
    MatButtonModule,
  ],
  exports: [
    BookFormComponent,
  ],
})
export class BookFormModule { }
