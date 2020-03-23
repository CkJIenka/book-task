import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class UrlApiInterceptor implements HttpInterceptor {

  private readonly _baseUrl = '/api/';

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({ url: this._baseUrl + req.url });

    return next.handle(request);
  }

}
