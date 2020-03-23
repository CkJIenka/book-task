import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IBook } from '@app/shared/interfaces/books/books.interface';
import { IResponceList } from '@app/shared/interfaces/responce-list.interface';

@Injectable({
  providedIn: 'root',
})
export class BookFormCreateService {

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public postBook(id: number, book: IBook): Observable<any> {
    return this._http.post(`authors/${id}/books`, book)
      .pipe(
        catchError(this._handleError<IResponceList>('postBook', {})),
      );
  }

  private _handleError<T>(operation: string = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
