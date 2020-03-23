import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ToastrService } from '@libs/toastr/services/toastr.service';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.css'],
})
export class ToastrComponent implements OnInit {

  public show: Observable<any>;
  public message = '';

  constructor(
    private _toastrService: ToastrService,
  ) {}

  public ngOnInit(): void {
    const showObservable = this._toastrService.visibilityChanged$();
    showObservable.subscribe((show: any) => {
      this.show = show;
      if (this.show) {
        this.message = this._toastrService.message;
      } else {
        this.message = '';
      }
    });
  }

}

