import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IAuthors } from '../../../interfaces/authors';

import { AuthorFormService } from './author-form.service';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css'],
})
export class AuthorFormComponent implements OnInit, OnDestroy {

  @Input()
  public author: IAuthors;

  public authorForm: FormGroup;
  private _destroy$: Subject<any> = new Subject<any>();

  constructor(
    private _formBuilder: FormBuilder,
    private _authorFormService: AuthorFormService,
  ) { }

  get firstName(): any {
    return this.authorForm.get('first_name');
  }
  get lastName(): any {
    return this.authorForm.get('last_name');
  }

  public ngOnInit(): void {
    this._initForm();
  }

  public onSubmit(author: IAuthors): IAuthors {
    if (this.authorForm.invalid) {
      return;
    }
    this._authorFormService.postAuthor(author)
      .pipe(
          takeUntil(this._destroy$),
        )
      .subscribe();
    this.authorForm.reset();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _initForm(): void {
    this.authorForm = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
    });
  }

}
