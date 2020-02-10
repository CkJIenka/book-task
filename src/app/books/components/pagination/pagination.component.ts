import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {

  @Input()
  set receivedPagesData(value: number) {
    this._receivedPagesData = value;
    this._createPaginator();
  }
  get receivedPagesData(): number {
    return this._receivedPagesData;
  }

  public activedButton = true;
  public pagesAmount = [];

  @Output() public selectPage = new EventEmitter<number>();

  private _receivedPagesData: number;
  private _currentPageNumber = 1;

  constructor(
    protected paginationService: PaginationService,
    ) { }

  public ngOnInit(): void { }

  protected selectPageNumber(page: number): void {
    this.selectPage.emit(page);
    this._currentPageNumber = page;
    this._createPaginator();
  }

  private _createPaginator(): any {
    this.pagesAmount =
      this.paginationService.createPaginator(this._currentPageNumber, this.receivedPagesData);
  }

  private _previousPage(): void {
    if (this._currentPageNumber > 1) {
      this.selectPageNumber(this._currentPageNumber - 1);
    }
  }

  private _nextPage(): void {
    if (this._currentPageNumber < this.receivedPagesData) {
      this.selectPageNumber(this._currentPageNumber + 1);
    }
  }

}
