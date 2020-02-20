import {
  Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { IAuthors } from '@app/shared/interfaces/authors';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css'],
})
export class AuthorFormComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  public author: IAuthors;

  @Output()
  public readonly authorSubmitted = new EventEmitter<object>();

  public authorForm: FormGroup;
  private _destroy$ = new Subject<void>();

  constructor(
    private _formBuilder: FormBuilder,
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

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.author.currentValue !== changes.author.previousValue) {
      this._setInputValue(changes.author.currentValue);
    }
  }

  public onSubmit(author: IAuthors): void {
    if (this.authorForm.invalid) {
      return;
    }
    this.authorSubmitted.emit(author);
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

  private _setInputValue(author: IAuthors): void {
    this.firstName.patchValue(author.first_name);
    this.lastName.patchValue(author.last_name);
  }

}
