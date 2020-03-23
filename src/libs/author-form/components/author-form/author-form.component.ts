import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges,
} from '@angular/core';
import { Location } from '@angular/common';

import { IAuthor } from '@app/shared/interfaces/authors.interface';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css'],
})
export class AuthorFormComponent implements OnInit, OnChanges {

  @Input()
  public author: IAuthor;

  @Output()
  public readonly authorSubmitted = new EventEmitter<object>();

  public authorData: IAuthor;

  constructor(
    private readonly _location: Location,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.author &&
      changes.author.currentValue !== null &&
      changes.author.currentValue !== changes.author.previousValue
    ) {
      this.authorData = changes.author.currentValue;
    }
  }

  public ngOnInit(): void {}

  public addAuthorData(author: IAuthor): void {
    this.authorSubmitted.emit(author);
  }

  public goBack(): void {
    this._location.back();
  }

}
