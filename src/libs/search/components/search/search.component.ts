import {
  Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef
} from '@angular/core';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {

  @ViewChild('search', { read: ElementRef, static: true })
  public search: ElementRef;

  @Input()
  public debounce: number;

  @Output()
  public readonly searchValue = new EventEmitter<string>();

  private _destroy$ = new Subject<void>();

  constructor() {}

  public ngOnInit(): void {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(this.debounce),
        takeUntil(this._destroy$),
      )
      .subscribe(() => this.searchValue.emit(this.search.nativeElement.value));
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
