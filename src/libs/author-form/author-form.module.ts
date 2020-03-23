import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatInputModule , MatCardModule, MatButtonModule } from '@angular/material';

import { AuthorFormComponent } from './components/author-form/author-form.component';
import { AuthorFormTemplateComponent } from './components/author-form-template/author-form-template.component';
import { AuthorFormReactiveComponent } from './components/author-form-reactive/author-form-reactive.component';

@NgModule({
  declarations: [
    AuthorFormComponent,
    AuthorFormReactiveComponent,
    AuthorFormTemplateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
  ],
  exports: [
    AuthorFormComponent,
    AuthorFormReactiveComponent,
    AuthorFormTemplateComponent,
  ],
})
export class AuthorFormModule { }
