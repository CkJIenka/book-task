import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IAuthors } from '@app/shared/interfaces/authors';
import { AuthorFormCreateService } from '@app/authors/services/author-form-create.service';

import { ToastrService } from '@libs/toastr/services/toastr.service';

@Component({
  templateUrl: './author-form-create.view.html',
  styleUrls: ['./author-form-create.view.css'],
})
export class AuthorFormCreateView implements OnInit, OnDestroy {

  private _destroy$ = new Subject<void>();

  constructor(
    private _authorFormCreateService: AuthorFormCreateService,
    private _location: Location,
    private _toastrService: ToastrService,
  ) { }

  public ngOnInit(): void {
  }

  public authorSave(author: IAuthors): any {
    this._authorFormCreateService.postAuthor(author)
      .pipe(
          takeUntil(this._destroy$),
        )
      .subscribe();
    this._toastrService.open('Data was successfully added.');
    setTimeout(() => {
      this.goBack();
    }, 2000);
  }

  public goBack(): void {
    this._location.back();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
