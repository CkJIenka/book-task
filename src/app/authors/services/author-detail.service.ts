import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IAuthors } from '../../interfaces/authors';
import { IResponceList } from '../../interfaces/responce-list';

@Injectable({
  providedIn: 'root',
})
export class AuthorDetailService {

  constructor(
    protected http: HttpClient,
  ) { }

  public getAuthor(id: number): Observable<IAuthors> {
    return this.http.get<IAuthors>(`authors/${id}`)
      .pipe(
        catchError(this.handleError<any>('getAuthor', {})),
      );
  }

  public changeAuthor(author: IAuthors, id: number): Observable<any> {
    const body = { first_name: author.first_name, last_name: author.last_name };

    return this.http.put(`authors/${id}`, body)
      .pipe(
        catchError(this.handleError<IResponceList>('changeAuthor', {})),
      );
  }
  protected handleError<T>(operation: string = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
