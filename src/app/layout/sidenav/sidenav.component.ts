import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from './../../authorization/services/authorization.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {

  constructor(
    private _authService: AuthorizationService,
    private _router: Router,
  ) { }

  public ngOnInit(): void {
  }

  public logOut(): void {
    this._authService.logOut();
    this._router.navigate(['/login']);
  }

}
