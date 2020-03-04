import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IAuthor } from '@app/shared/interfaces/authors.interface';
import { AuthorFormEditService } from '@app/authors/services/author-form-edit.service';

import { ToastrService } from '@libs/toastr/services/toastr.service';


@Component({
  templateUrl: './author-form-edit.view.html',
  styleUrls: ['./author-form-edit.view.css'],
})
export class AuthorFormEditView implements OnInit {

  public currentAuthor: IAuthor;
  private _id = +this._route.snapshot.paramMap.get('id');
  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _location: Location,
    private readonly _authorFormEditService: AuthorFormEditService,
    private readonly _toastrService: ToastrService,
  ) { }

  public ngOnInit(): void {
    this._getAuthor();
  }

  public authorEdit(author: IAuthor): void {
    this._authorFormEditService.changeAuthor(this._id, author)
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

  private _getAuthor(): void {
    this._authorFormEditService.getAuthor(this._id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response) => {
        this.currentAuthor = response;
      });
  }

}
