import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule, MatSidenavModule } from '@angular/material';

import { SidenavComponent } from './sidenav/sidenav.component';

import { ToastrModule } from '@libs/toastr';

@NgModule({
  declarations: [
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule,
    MatListModule,
    ToastrModule,
  ],
  exports: [
    SidenavComponent,
  ],
})
export class LayoutModule { }
