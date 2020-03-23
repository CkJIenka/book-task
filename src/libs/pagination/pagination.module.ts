import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material';

import { PaginationComponent } from './components/pagination.component';

@NgModule({
  declarations: [
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [
    PaginationComponent,
  ],
})
export class PaginationModule { }
