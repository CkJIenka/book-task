import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { customPasswordFormValidator } from '@app/shared/utils/custom-passwords-form-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;

  constructor(
    private _formBulder: FormBuilder,
  ) { }

  public get login(): AbstractControl | null {
    return this.registrationForm.get('login');
  }

  public get email(): AbstractControl | null {
    return this.registrationForm.get('email');
  }

  public get passwords(): AbstractControl | null {
    return this.registrationForm.get('passwords');
  }

  public get password(): AbstractControl | null {
    return this.registrationForm.get('passwords.password');
  }
  public get confirmPassword(): AbstractControl | null {
    return this.registrationForm.get('passwords.confirmPassword');
  }

  public ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.registrationForm = this._formBulder.group({
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwords: this._formBulder.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }, { validator: customPasswordFormValidator() }),
    });
  }

}
