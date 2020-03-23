import { NgModule, Optional, SkipSelf } from '@angular/core';

import { BooksListService } from './books-list.service';
import { BookFormEditService } from './book-form-edit.service';
import { BookFormCreateService } from './book-form-create.service';
import { AuthorFormEditService } from './author-form-edit.service';
import { AuthorFormCreateService } from './author-form-create.service';
import { AuthorDetailService } from './author-detail.service';
import { AuthorizationService } from './authorization.service';
import { AuthorsListService } from './authors-list.service';
import { AuthorizationGuard } from './authorization-guard';

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
