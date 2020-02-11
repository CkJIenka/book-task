import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthorDetailService } from '../../services/author-detail.service';
import { IAuthors } from '../../../interfaces/authors';

@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css'],
})
export class AuthorDetailComponent implements OnInit, OnDestroy {

  public author = {
    first_name: '',
    last_name: '',
  };
  public authorChangedForm: FormGroup;

  private _destroy$: Subject<any> = new Subject<any>();


  constructor(
    private _authorDetailService: AuthorDetailService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this._getAuthor();
    this._initForm();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(author: IAuthors): object {
    if (this.authorChangedForm.invalid) {
      return;
    }
    const id = +this._route.snapshot.paramMap.get('id');

    this._authorDetailService.changeAuthor(author, id)
      .subscribe((response) => {
        this.author = response;
      });
  }

  private _getAuthor(): void {
    const id = +this._route.snapshot.paramMap.get('id');

    this._authorDetailService.getAuthor(id)
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response) => {
        this.author = response;
        this._getAuthor();
      });
  }

  get first_name(): any {
    return this.authorChangedForm.get('first_name');
  }
  get last_name(): any {
    return this.authorChangedForm.get('last_name');
  }

  private _initForm(): void {
    this.authorChangedForm = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
  }

}
