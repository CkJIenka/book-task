import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IResponceList } from '../../interfaces/responce-list';
import { IAuthors } from '../../interfaces/authors';

@Injectable({
  providedIn: 'root',
})
export class AuthorsListService {

  constructor(
    protected http: HttpClient,
  ) { }

  public getAuthors(): Observable<IResponceList> {
    return this.http.get<IResponceList>('authors')
      .pipe(
        catchError(this.handleError<IResponceList>('getAuthors', {})),
      );
  }

  public postAuthor(author: IAuthors): Observable<any> {
    const body = { first_name: author.first_name, last_name: author.last_name };

    return this.http.post('authors', body)
      .pipe(
        catchError(this.handleError<IResponceList>('postAuthor', {})),
    );
  }

  public deleteAuthor(id: number): Observable<any> {
    return this.http.delete(`authors/${id}`)
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
