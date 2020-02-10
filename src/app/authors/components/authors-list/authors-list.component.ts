import { Component, OnInit, OnDestroy } from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthorsListService } from '../../services/authors-list.service';
import { IAuthors } from '../../../interfaces/authors';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.css'],
})
export class AuthorsListComponent implements OnInit, OnDestroy {

  protected authors: IAuthors[];
  protected pagesData: number;
  protected destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    protected authorsListService: AuthorsListService,
  ) { }

  public ngOnInit(): void {
    this.getAuthors();
  }

  public getAuthors(): void {
    this.authorsListService.getAuthors()
      .pipe(
        takeUntil(this.destroy),
      )
      .subscribe((response) => {
        this.authors = response.authors;
        this.pagesData = response.meta.pages;
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

}
