import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material';

import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
  ],
  exports: [
    SearchComponent,
  ],
})
export class SearchModule { }
