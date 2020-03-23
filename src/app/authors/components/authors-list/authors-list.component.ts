import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IAuthor } from '@app/shared/interfaces/authors.interface';
import { AuthorsListService } from '@app/core/services/authors-list.service';
import { IMeta } from '@app/shared/interfaces/meta.interface';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css'],
})
export class AuthorsListComponent implements OnInit, OnDestroy {

  public requestMeta: IMeta;
  public authors: IAuthor[];
  public displayedColumns: string[] = ['authorLogo', 'authorName', 'deleteButton'];
  private _destroy$ = new Subject<void>();

  constructor(
    private readonly _authorsListService: AuthorsListService,
  ) { }

  public ngOnInit(): void {
    this.getAuthors();
  }
  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
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
