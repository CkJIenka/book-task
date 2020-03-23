import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { customDateFormValidator } from '@app/shared/utils/custom-date-form-validator';

@Component({
  selector: 'app-dates-form',
  templateUrl: './dates-form.component.html',
  styleUrls: ['./dates-form.component.css'],
})
export class DatesFormComponent implements OnInit {

  @Input()
  public dateValue: FormGroup;

  @Output()
  public readonly dateSearchValue = new EventEmitter<object>();

  public date: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this._initForm();
    this._patchDateValue();
    this.date.valueChanges
      .subscribe((val) =>
        this.dateSearchValue.emit(this.date),
      );
  }

  private _initForm(): void {
    this.date = this._formBuilder.group({
      dateStart: null,
      dateEnd: null,
    }, { validators: customDateFormValidator() });
  }

  private _patchDateValue(): void {
    this.date.patchValue({
      dateStart:
      !!this.dateValue.controls.dateStart.value ? this.dateValue.controls.dateStart.value : null,
      dateEnd:
      !!this.dateValue.controls.dateEnd.value ? this.dateValue.controls.dateEnd.value : null,
    });
  }

}
