import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IAuthors } from '../../interfaces/authors';
import { IResponceList } from '../../interfaces/responce-list';

@Injectable({
  providedIn: 'root',
})
export class AuthorFormEditService {

  constructor(
    protected _http: HttpClient,
  ) { }

  public changeAuthor(author: IAuthors, id: number): Observable<any> {
    return this._http.put(`authors/${id}`, author)
      .pipe(
        catchError(this.handleError<IResponceList>('changeAuthor', {})),
      );
  }

  public getAuthor(id: number): Observable<IAuthors> {
    return this._http.get<IAuthors>(`authors/${id}`)
      .pipe(
        catchError(this.handleError<any>('getAuthor', {})),
      );
  }

  protected handleError<T>(operation: string = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
