import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {

  public isAuthorizedFlag = false;

  constructor() {}

  public logIn(): void {
    this.isAuthorizedFlag = true;
    localStorage.setItem('authFlag', `${this.isAuthorizedFlag}`);
  }

  public logOut(): void {
    this.isAuthorizedFlag = false;
    localStorage.setItem('authFlag', `${this.isAuthorizedFlag}`);
  }

  public isAuthorized(): boolean {
    if (localStorage.getItem('authFlag') === 'true') {
      this.isAuthorizedFlag = true;
    } else {
      this.isAuthorizedFlag = false;
    }

    return this.isAuthorizedFlag;
  }

}

