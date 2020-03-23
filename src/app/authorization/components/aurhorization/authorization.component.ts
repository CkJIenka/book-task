import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizationService } from '@app/core/services/authorization.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent implements OnInit {

  public loginForm: FormGroup;

  public get login(): AbstractControl | null {
    return this.loginForm.get('login');
  }

  public get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthorizationService,
    private _router: Router,
  ) { }

  public ngOnInit(): void {
    this._initForm();
  }

  public logIn(): void {
    this._authService. logIn();
    this._router.navigate(['/books']);
  }

  private _initForm(): void {
    this.loginForm = this._formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
