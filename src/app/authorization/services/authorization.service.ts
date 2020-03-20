import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  public isAuthorizedFlag = false;

  constructor() {}

  public logIn(): void {
    this.isAuthorizedFlag = true;
  }

  public logOut(): void {
    this.isAuthorizedFlag = false;
  }

  public isAuthorized(): boolean {
    return this.isAuthorizedFlag;
  }

}

