import { Component, forwardRef, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';

import { MatAutocompleteSelectedEvent } from '@angular/material';

import { IGenres } from '@app/shared/interfaces/genres.interface';

import { GenresCustomControlService } from './../services/genres-custom-control.service';

@Component({
  selector: 'app-genres-custom-control',
  templateUrl: './genres-custom-control.component.html',
  styleUrls: ['./genres-custom-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenresCustomControlComponent),
      multi: true,
    },
  ],
})
export class GenresCustomControlComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @ViewChild('genreInput', { read: ElementRef, static: true })
  public genreInput: ElementRef<HTMLInputElement>;

  public genres: any;
  public allGenres: IGenres[];
  public genreCtrl = new FormControl();
  public filteredGenres: Observable<IGenres[]>;
  private _destroy$ = new Subject<void>();
  private _genreFromUrl: string[];

  constructor(
    private _genresService : GenresCustomControlService,
  ) {}

  get value(): any[] {
    return this.genres;
  }

  set value(val: any[]) {
    this.genres = val;
    this.onChange(val);
    this.onTouched(val);
  }

  public ngOnInit(): void {
    this._getGenres();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onChange: any = () => {};
  public onTouched: any = () => {};

  public writeValue(val: string[]): void {
    if (val) {
      if (val.length > 0) {
        this._genreFromUrl = [...val];
      }
      this.genres = val;
    } else {
      this.genres = [];
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public removeGenreFromSelect(genre: IGenres): void {
    const index = this.genres.indexOf(genre);
    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

  public selectedBookGenre(event: MatAutocompleteSelectedEvent): void {
    if (this.genres.indexOf(event.option.value) === -1) {
      this.genres.push(event.option.value);
    }
    this.genreInput.nativeElement.value = '';
    this.genreCtrl.setValue(null);
  }

  private _filterGenres(value: string): IGenres[] {
    return this.allGenres.filter((genre) => genre.name.toLowerCase().indexOf(value) === 0);
  }

  private _getGenres(): void {
    this._genresService.getGenres()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response) => {
        this.allGenres = response.genres;
        if (this._genreFromUrl) {
          this._genreFromUrl.forEach((value) => {
            this.genres.shift();
            this.allGenres.forEach((val) => {
              if (val.name === value) {
                this.genres.push(val);
              }
            });
          });
        }
        this.filteredGenres = this.genreCtrl.valueChanges.pipe(
          startWith(null),
          map((genre: string | null) =>
          genre ? this._filterGenres(genre) : this.allGenres.slice()));
      });
  }

}
