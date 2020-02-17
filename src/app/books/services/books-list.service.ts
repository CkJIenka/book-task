import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IResponceList } from '../../shared/interfaces/responce-list';

@Injectable({
  providedIn: 'root',
})
export class BooksListService {

  constructor(
    protected http: HttpClient,
  ) { }

  public getBooks(page: number = 1): Observable<IResponceList> {
    return this.http.get<IResponceList>(`books?page=${page}`)
      .pipe(
        catchError(this.handleError<IResponceList>('getBooks', {})),
      );
  }

  protected handleError<T>(operation: string = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
