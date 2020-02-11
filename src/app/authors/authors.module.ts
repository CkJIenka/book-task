import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsListComponent } from './components/authors-list/authors-list.component';
import { AuthorDetailComponent } from './components/author-detail/author-detail.component';

@NgModule({
  declarations: [
    AuthorsListComponent,
    AuthorDetailComponent,
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    ReactiveFormsModule,
  ],
})
export class AuthorsModule { }
