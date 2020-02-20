import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IResponceList } from '@app/shared/interfaces/responce-list';

@Injectable({
  providedIn: 'root',
})
export class BooksListService {

  public title: string;

  constructor(
    protected http: HttpClient,
  ) { }

  public getBooks(page: number, title: string): Observable<IResponceList> {
    return this.http.get<IResponceList>(`books?page=${page}&limit=10&q[title_cont]=${title}`)
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
