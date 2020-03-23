import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  MatInputModule, MatButtonModule, MatCardModule,
  MatExpansionModule, MatDatepickerModule, MatNativeDateModule,
  MatTableModule, MatChipsModule, MatIconModule,
  MatAutocompleteModule,
} from '@angular/material';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  exports: [
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatCardModule,
  ],
})
export class SharedModule { }
