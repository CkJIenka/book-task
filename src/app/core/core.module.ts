import { NgModule, Optional, SkipSelf } from '@angular/core';

import { BooksListService } from './services/books-list.service';
import { BookFormEditService } from './services/book-form-edit.service';
import { BookFormCreateService } from './services/book-form-create.service';
import { AuthorFormEditService } from './services/author-form-edit.service';
import { AuthorFormCreateService } from './services/author-form-create.service';
import { AuthorDetailService } from './services/author-detail.service';
import { AuthorizationService } from './services/authorization.service';
import { AuthorsListService } from './services/authors-list.service';
import { AuthorizationGuard } from './services/authorization-guard';

@NgModule({
  providers: [
    AuthorizationService,
    AuthorDetailService,
    AuthorFormCreateService,
    AuthorFormEditService,
    AuthorsListService,
    BookFormCreateService,
    BookFormEditService,
    BooksListService,
    AuthorizationGuard,
  ],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only',
      );
    }
  }

}
