import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {

  private _message = '';
  private _show = new BehaviorSubject(false);

  constructor() { }

  public get message(): string {
    return this._message;
  }

  public open(text: string): string {
    this._message = text;
    this._show.next(true);
    setTimeout(() => {
      this._show.next(false);
    }, 2000);

    return this.message;
  }

  public visibilityChanged$(): Observable<any> {
    return this._show.asObservable();
  }

}
