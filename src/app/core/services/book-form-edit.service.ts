import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IBook } from '@app/shared/interfaces/books/books.interface';
import { IResponceList } from '@app/shared/interfaces/responce-list.interface';

@Injectable({
  providedIn: 'root',
})
export class BookFormEditService {

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public changeBook(id: number, book: IBook): Observable<any> {
    const currentChanging = {
      title: book.title,
      description: book.description,
    };

    return this._http.put(`books/${id}`, currentChanging)
      .pipe(
        catchError(this.handleError<IResponceList>('changeBook', {})),
      );
  }

  public getBook(id: number): Observable<IBook> {
    return this._http.get<IBook>(`books/${id}`)
      .pipe(
        catchError(this.handleError<any>('getBook', {})),
      );
  }

  protected handleError<T>(operation: string = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

}
