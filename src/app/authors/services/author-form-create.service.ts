import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IAuthors } from '../../shared/interfaces/authors';
import { IResponceList } from '../../shared/interfaces/responce-list';

@Injectable({
  providedIn: 'root',
})
export class AuthorFormCreateService {


  constructor(
    protected _http: HttpClient,
  ) { }

  public postAuthor(author: IAuthors): Observable<any> {
    return this._http.post('authors', author)
      .pipe(
        catchError(this.handleError<IResponceList>('postAuthor', {})),
      );
  }

  protected handleError<T>(operation: string = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
