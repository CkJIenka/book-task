import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  public authorForm: FormGroup;
  protected authors: IAuthors[];
  protected pagesData: number;
  private _destroy$: Subject<any> = new Subject<any>();

  constructor(
    private _authorsListService: AuthorsListService,
    private _formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.getAuthors();
    this._initForm();
  }

  public getAuthors(): void {
    this._authorsListService.getAuthors()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response) => {
        this.authors = response.authors;
        this.pagesData = response.meta.pages;
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  get first_name(): any {
    return this.authorForm.get('first_name');
  }
  get last_name(): any {
    return this.authorForm.get('last_name');
  }

  public onSubmit(author: IAuthors): object {
    if (this.authorForm.invalid) {
      return;
    }
    this._authorsListService.postAuthor(author)
      .subscribe((response) => {
        this.authors.push(response);
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

  private _initForm(): void {
    this.authorForm = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
  }

}
