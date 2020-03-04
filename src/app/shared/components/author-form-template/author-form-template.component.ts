import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';

import { IAuthor } from '@app/shared/interfaces/authors.interface';

@Component({
  selector: 'app-author-form-template',
  templateUrl: './author-form-template.component.html',
  styleUrls: ['./author-form-template.component.css'],
})
export class AuthorFormTemplateComponent implements OnInit, OnChanges {

  @Input()
  public authorTemplate: IAuthor;

  @Output()
  public readonly authorTemplateSubmitted = new EventEmitter<object>();

  private _authorSnapshot: IAuthor;

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.authorTemplate.currentValue !== null &&
      changes.authorTemplate.currentValue !== changes.authorTemplate.previousValue
    ) {
      this.authorTemplate = { ...changes.authorTemplate.currentValue };
      this._authorSnapshot = { ...changes.authorTemplate.currentValue };
    }
  }

  public ngOnInit(): void {
    this.authorTemplate = {
      id: null,
      first_name: '',
      last_name: '',
    };
  }

  public onSubmitTemplate(form: any): void {
    if (form.invalid) {
      return;
    }
    this.authorTemplateSubmitted.emit(form.form.value);
  }

  public resetTemplateForm(form: any): void {
    if (this.authorTemplate) {
      this.authorTemplate = { ...this._authorSnapshot } ;
    } else {
      this.clearTemplateForm(form);
    }
  }

  public clearTemplateForm(form: any): void {
    form.reset();
  }

}
