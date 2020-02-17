import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrComponent } from './components';

@NgModule({
  declarations: [
    ToastrComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ToastrComponent,
  ],
})
export class ToastrModule { }
