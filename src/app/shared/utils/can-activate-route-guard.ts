import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthorizationService } from '../../authorization/services/authorization.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(
    private _authService: AuthorizationService,
    private _router: Router,
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authService.isAuthorized()) {
      return true;
    } else {
      this._router.navigate(['/login']);

      return false;
    }
  }

}

