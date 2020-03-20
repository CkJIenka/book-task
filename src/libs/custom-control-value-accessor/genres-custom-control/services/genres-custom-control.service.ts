import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IResponceList } from '@app/shared/interfaces/responce-list.interface';
import { IGenres } from '@app/shared/interfaces/genres.interface';

@Injectable({
  providedIn: 'root',
})
export class GenresCustomControlService {

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public getGenres(): Observable<IResponceList> {
    const queryParams: any = {
      limit: 40,
    };

    return this._http
      .get<IResponceList>(
        'genres',
      {
        params: queryParams,
      })
      .pipe(
        catchError(this.handleError<IResponceList>('getGenres', {})),
      );
  }

  protected handleError<T>(operation: string = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
