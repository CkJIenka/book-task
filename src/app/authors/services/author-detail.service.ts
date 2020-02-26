import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IAuthor } from '@app/shared/interfaces/authors';

@Injectable({
  providedIn: 'root',
})
export class AuthorDetailService {

  constructor(
    protected http: HttpClient,
  ) { }

  public getAuthor(id: number): Observable<IAuthor> {
    return this.http.get<IAuthor>(`authors/${id}`)
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
