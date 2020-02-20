import {
  Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges
} from '@angular/core';

import { IMeta } from '@app/shared/interfaces/meta';

import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input()
  public receivedMeta: IMeta;

  @Output()
  public readonly selectPage = new EventEmitter<number>();

  public activedButton = true;
  public pagesAmount = [];

  public receivedPagesData: number;
  public currentPageNumber: number;

  constructor(
    protected paginationService: PaginationService,
  ) {}

  public ngOnInit(): void { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.receivedMeta.currentValue !== changes.receivedMeta.previousValue) {
      this.receivedPagesData = changes.receivedMeta.currentValue.pages;
      this.currentPageNumber = changes.receivedMeta.currentValue.page;
      this._createPaginator();
    }
  }

  public previousPage(): void {
    if (this.currentPageNumber > 1) {
      this.selectPageNumber(this.currentPageNumber - 1);
    }
  }

  public nextPage(): void {
    if (this.currentPageNumber < this.receivedPagesData) {
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

  private _createPaginator(): void {
    this.pagesAmount =
      this.paginationService.createPaginator(this.currentPageNumber, this.receivedPagesData);
  }

}
