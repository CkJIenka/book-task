import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  public isDisabled = false;
  public genres = [];
  public allGenres = [
    { id: 1, name: 'Drama' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Fantasy' },
    { id: 4, name: 'Science' },
    { id: 5, name: 'Comedy' },
  ];

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
  }

  public addGenre(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.genres.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }


}
