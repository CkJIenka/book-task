import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IResponceList } from '@app/shared/interfaces/responce-list';

@Injectable({
  providedIn: 'root',
})
export class AuthorsListService {

  constructor(
    protected _http: HttpClient,
  ) { }

  public getAuthors(page: number, title: string): Observable<IResponceList> {
    return this._http.get<IResponceList>(`authors?page=${page}`)
      .pipe(
        catchError(this.handleError<IResponceList>('getAuthors', {})),
      );
  }

  public deleteAuthor(id: number): Observable<any> {
    return this._http.delete(`authors/${id}`)
      .pipe(
        catchError(this.handleError<IResponceList>('deleteAuthor', {})),
      );
  }

  protected handleError<T>(operation: string = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
