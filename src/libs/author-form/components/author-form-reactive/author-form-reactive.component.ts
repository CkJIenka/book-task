import {
  Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IAuthor } from '@app/shared/interfaces/authors.interface';


@Component({
  selector: 'app-author-form-reactive',
  templateUrl: './author-form-reactive.component.html',
  styleUrls: ['./author-form-reactive.component.scss'],
})
export class AuthorFormReactiveComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public authorReactive: IAuthor;

  @Output()
  public readonly authorReactiveSubmitted = new EventEmitter<object>();

  public authorForm: FormGroup;
  private _destroy$ = new Subject<void>();
  private readonly _authorNamePattern = '^[ A-Za-z-]*$';


  constructor(
    private readonly _formBuilder: FormBuilder,
  ) { }

  get firstName(): AbstractControl | null {
    return this.authorForm.get('first_name');
  }
  get lastName(): AbstractControl | null {
    return this.authorForm.get('last_name');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.authorReactive &&
      changes.authorReactive.currentValue !== null &&
      changes.authorReactive.currentValue !== changes.authorReactive.previousValue
    ) {
      this._patchFormValue(changes.authorReactive.currentValue);
    }
  }

  public ngOnInit(): void {
    this._initForm();
    if (this.authorForm) {
      this.authorForm.get('first_name').valueChanges
        .pipe(
          takeUntil(this._destroy$),
        )
        .subscribe((val) => {
          if (val) {
            this.authorForm.get('last_name').enable();
          } else {
            this.authorForm.get('last_name').disable();
          }
        });
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(author: IAuthor): void {
    if (this.authorForm.invalid) {
      return;
    }
    this.authorReactiveSubmitted.emit(author);
    this.authorForm.reset();
  }

  public resetForm(): void {
    if (this.authorReactive != null) {
      this._patchFormValue(this.authorReactive);
    } else {
      this.clearForm();
    }
  }

  public clearForm(): void {
    this.authorForm.reset();
  }

  private _initForm(): void {
    this.authorForm = this._formBuilder.group({
      first_name: [
        '', [
          Validators.required,
          Validators.pattern(this._authorNamePattern),
        ],
      ],
      last_name: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.pattern(this._authorNamePattern),
        ],
      ],
    });
  }

  private _patchFormValue(author: IAuthor): void {
    this.authorForm.patchValue({
      first_name: author.first_name,
      last_name: author.last_name,
    });
  }

}
