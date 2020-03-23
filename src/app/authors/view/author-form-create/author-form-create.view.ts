import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IAuthor } from '@app/shared/interfaces/authors.interface';
import { AuthorFormCreateService } from '@app/core/services/author-form-create.service';

import { ToastrService } from '@libs/toastr/services/toastr.service';

@Component({
  templateUrl: './author-form-create.view.html',
  styleUrls: ['./author-form-create.view.css'],
})
export class AuthorFormCreateView implements OnInit, OnDestroy {

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _location: Location,
    private readonly _authorFormCreateService: AuthorFormCreateService,
    private readonly _toastrService: ToastrService,
  ) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public authorSave(author: IAuthor): any {
    this._authorFormCreateService.postAuthor(author)
      .pipe(
          takeUntil(this._destroy$),
        )
      .subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          this._toastrService.open('Data was successfully added.');
          setTimeout(() => {
            this.goBack();
          }, 2000);
        },
      });
  }

  public goBack(): void {
    this._location.back();
  }

}
