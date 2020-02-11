import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {

  @Input()
  set receivedMeta(value: number) {
    this.receivedPagesData = value;
    this._createPaginator();
  }
  get receivedMeta(): number {
    return this.receivedPagesData;
  }

  public activedButton = true;
  public pagesAmount = [];

  @Output() public selectPage = new EventEmitter<number>();

  public receivedPagesData: number;
  public currentPageNumber = 1;

  constructor(
    protected paginationService: PaginationService,
    ) { }

  public ngOnInit(): void { }

  public previousPage(): void {
    if (this.currentPageNumber > 1) {
      this.selectPageNumber(this.currentPageNumber - 1);
    }
  }

  public nextPage(): void {
    if (this.currentPageNumber < this.receivedMeta) {
      this.selectPageNumber(this.currentPageNumber + 1);
    }
  }

  public selectPageNumber(page: number): void {
    this.selectPage.emit(page);
    this.currentPageNumber = page;
    this._createPaginator();
  }

  public goFirst(page: number): void {
    this.selectPageNumber(page);
  }

  public goLast(page: number): void {
    this.selectPageNumber(page);
  }

  private _createPaginator(): any {
    this.pagesAmount =
      this.paginationService.createPaginator(this.currentPageNumber, this.receivedMeta);
  }

}
