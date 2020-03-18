import { Component, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-genres-custom-control',
  templateUrl: './genres-custom-control.component.html',
  styleUrls: ['./genres-custom-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenresCustomControlComponent),
      multi: true,
    },
  ],
})
export class GenresCustomControlComponent implements ControlValueAccessor {

  @ViewChild('genreInput', { read: ElementRef, static: true })
  public genreInput: ElementRef<HTMLInputElement>;

  public genres = [];
  public allGenres = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Fantasy' },
    { id: 4, name: 'Science' },
    { id: 5, name: 'Comedy' },
  ];
  public genreCtrl = new FormControl();
  public filteredGenres: Observable<object[]>;

  constructor() {
    this.filteredGenres = this.genreCtrl.valueChanges.pipe(
        startWith(null),
        map((genre: string | null) => genre ? this._filterGenres(genre) : this.allGenres.slice()));
  }

  get value(): any[] {
    return this.genres;
  }

  set value(val: any[]) {
    this.genres = val;
    this.onChange(val);
    this.onTouched(val);
  }

  public onChange: any = () => {};
  public onTouched: any = () => {};

  public writeValue(val: any): void {
    this.genres = val;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public removeGenreFromSelect(genre: string): void {
    const index = this.genres.indexOf(genre);
    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

  public selectedBookGenre(event: MatAutocompleteSelectedEvent): void {
    if (this.genres.indexOf(event.option.value.name) === -1) {
      this.genres.push(event.option.value.name);
    }
    this.genreInput.nativeElement.value = '';
    this.genreCtrl.setValue(null);
  }

  private _filterGenres(value: string): object[] {
    return this.allGenres.filter((genre) => genre.name.toLowerCase().indexOf(value) === 0);
  }

}
