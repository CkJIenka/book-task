import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthorsListService } from '../../services/authors-list.service';
import { IAuthors } from '../../../interfaces/authors';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css'],
})
export class AuthorsListComponent implements OnInit, OnDestroy {

  public requestMeta: number;
  public authors: IAuthors[];
  private _destroy$: Subject<any> = new Subject<any>();

  constructor(
    private _authorsListService: AuthorsListService,
  ) { }

  public ngOnInit(): void {
    this.getAuthors();
  }

  public getAuthors(page: number = 1): void {
    this._authorsListService.getAuthors(page)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response) => {
        this.authors = response.authors;
        this.requestMeta = response.meta.pages;
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public deleteAuthor(id: number): void {
    this._authorsListService.deleteAuthor(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.getAuthors();
      });
  }

}
