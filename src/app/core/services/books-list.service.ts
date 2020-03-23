import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IResponceList } from '@app/shared/interfaces/responce-list.interface';
import { IBooksQueryParams } from '@app/shared/interfaces/books/books.query-params.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksListService {

  public title: string;

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public getBooks(queryParameters: IBooksQueryParams): Observable<IResponceList> {
    const queryParams: any = {
      page: queryParameters.page,
      limit: 10,
      'q[title_cont]': queryParameters.title_cont ? queryParameters.title_cont : '',
      'q[price_gteq]': queryParameters.price_from ? queryParameters.price_from : '',
      'q[price_lteq]': queryParameters.price_to ? queryParameters.price_to : '',
      'q[date_gteq]': queryParameters.date_start ? queryParameters.date_start : '',
      'q[date_lteq]': queryParameters.date_end ? queryParameters.date_end : '',
      'q[phone_cont]': queryParameters.phone_number ? queryParameters.phone_number : '',
      'q[genres_cont]': queryParameters.genres ? queryParameters.genres : '',
    };

    return this._http
      .get<IResponceList>(
        'books',
      {
        params: queryParams,
      })
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
