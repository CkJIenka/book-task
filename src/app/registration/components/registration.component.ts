import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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

  public ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.registrationForm = this._formBulder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

}
