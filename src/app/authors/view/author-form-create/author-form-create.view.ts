import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IAuthors } from '../../../interfaces/authors';
import { AuthorFormCreateService } from '../../services/author-form-create.service';

@Component({
  templateUrl: './author-form-create.view.html',
  styleUrls: ['./author-form-create.view.css'],
})
export class AuthorFormCreateView implements OnInit, OnDestroy {

  public success = false;
  private _destroy$: Subject<any> = new Subject<any>();

  constructor(
    private _authorFormCreateService: AuthorFormCreateService,
    private _location: Location,
  ) { }

  public ngOnInit(): void {
  }

  public authorSave(author: IAuthors): any {
    this._authorFormCreateService.postAuthor(author)
      .pipe(
          takeUntil(this._destroy$),
        )
      .subscribe();
    this.success = true;
    setTimeout(() => {
      this.success = false;
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
