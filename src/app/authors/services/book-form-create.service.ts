import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IBook } from '@app/shared/interfaces/books';
import { IResponceList } from '@app/shared/interfaces/responce-list';

@Injectable({
  providedIn: 'root',
})
export class BookFormCreateService {

  constructor(
    protected _http: HttpClient,
  ) { }

  public postBook(book: IBook, id: number): Observable<any> {
    return this._http.post(`authors/${id}/books`, book)
      .pipe(
        catchError(this.handleError<IResponceList>('postBook', {})),
      );
  }

  protected handleError<T>(operation: string = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
