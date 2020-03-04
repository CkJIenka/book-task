import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthorDetailService } from '@app/authors/services/author-detail.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css'],
})
export class AuthorDetailComponent implements OnInit, OnDestroy {

  public author = {
    id: 0,
    first_name: '',
    last_name: '',
  };
  public id = +this._route.snapshot.paramMap.get('id');

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _location: Location,
    private readonly _authorDetailService: AuthorDetailService,
  ) { }

  public ngOnInit(): void {
    this._getAuthor();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public goBack(): void {
    this._location.back();
  }

  private _getAuthor(): void {
    this._authorDetailService.getAuthor(this.id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response) => {
        this.author = response;
      });
  }

}
