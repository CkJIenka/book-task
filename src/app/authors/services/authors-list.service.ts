import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IResponceList } from '@app/shared/interfaces/responce-list.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorsListService {

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public getAuthors(page: number, title: string): Observable<IResponceList> {
    const queryParams: any = {
      page,
    };

    return this._http
      .get<IResponceList>(
        'authors',
      {
        params: queryParams,
      })
      .pipe(
        catchError(this._handleError<IResponceList>('getAuthors', {})),
      );
  }

  public deleteAuthor(id: number): Observable<any> {
    return this._http
      .delete(
        `authors/${id}`,
      )
      .pipe(
        catchError(this._handleError<IResponceList>('deleteAuthor', {})),
      );
  }

  private _handleError<T>(operation: string = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
