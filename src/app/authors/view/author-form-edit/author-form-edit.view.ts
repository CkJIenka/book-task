import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IAuthors } from '../../../interfaces/authors';
import { AuthorFormEditService } from '../../services/author-form-edit.service';

@Component({
  templateUrl: './author-form-edit.view.html',
  styleUrls: ['./author-form-edit.view.css'],
})
export class AuthorFormEditView implements OnInit {

  public currentAuthor: IAuthors;
  public success = false;
  private _id = +this._route.snapshot.paramMap.get('id');
  private _destroy$: Subject<any> = new Subject<any>();

  constructor(
    private _authorFormEditService: AuthorFormEditService,
    private _route: ActivatedRoute,
    private _location: Location,
  ) { }

  public ngOnInit(): void {
    this._getAuthor();
  }

  public authorEdit(author: IAuthors): void {
    this._authorFormEditService.changeAuthor(author, this._id)
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
