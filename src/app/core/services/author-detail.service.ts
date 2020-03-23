import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IAuthor } from '@app/shared/interfaces/authors.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorDetailService {

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public getAuthor(id: number): Observable<IAuthor> {
    return this._http.get<IAuthor>(`authors/${id}`)
      .pipe(
        catchError(this._handleError<any>('getAuthor', {})),
      );
  }

  private _handleError<T>(operation: string = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
