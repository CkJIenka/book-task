import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IAuthors } from '@app/shared/interfaces/authors';
import { AuthorsListService } from '@app/authors/services/authors-list.service';
import { IMeta } from '@app/shared/interfaces/meta';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css'],
})
export class AuthorsListComponent implements OnInit, OnDestroy {

  public requestMeta: IMeta;
  public authors: IAuthors[];
  private _destroy$ = new Subject<void>();

  constructor(
    private _authorsListService: AuthorsListService,
  ) { }

  public ngOnInit(): void {
    this.getAuthors();
  }

  public getAuthors(page: number = 1, title: string = ''): void {
    this._authorsListService.getAuthors(page, title)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response) => {
        this.authors = response.authors;
        this.requestMeta = response.meta;
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
