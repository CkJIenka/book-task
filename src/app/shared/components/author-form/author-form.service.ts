import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IAuthors } from '../../../interfaces/authors';
import { IResponceList } from '../../../interfaces/responce-list';

@Injectable({
  providedIn: 'root',
})
export class AuthorFormService {


  constructor(
    protected _http: HttpClient,
  ) { }

  public postAuthor(author: IAuthors): Observable<any> {
    const body = { first_name: author.first_name, last_name: author.last_name };

    return this._http.post('authors', body)
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
