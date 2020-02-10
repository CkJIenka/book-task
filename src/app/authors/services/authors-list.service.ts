import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IResponceList } from '../../interfaces/responce-list';

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

  protected handleError<T>(operation: string = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
