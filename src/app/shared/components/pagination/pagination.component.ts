import {
  Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IMeta } from '@app/shared/interfaces/meta.interface';

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

  public receivedPagesAmount: number;
  public currentPageNumber: number;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _paginationService: PaginationService,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.receivedMeta.currentValue !== changes.receivedMeta.previousValue) {
      this.receivedPagesAmount = changes.receivedMeta.currentValue.pages;
      this.currentPageNumber = changes.receivedMeta.currentValue.page;
      this._createPaginator();
    }
  }

  public ngOnInit(): void { }

  public previousPage(): void {
    if (this.currentPageNumber > 1) {
      this.selectPageNumber(this.currentPageNumber - 1);
      this._router.navigate([], {
        relativeTo: this._route,
        queryParamsHandling: 'merge',
        queryParams: {
          page: this.currentPageNumber,
        },
      });
    }
  }

  public nextPage(): void {
    if (this.currentPageNumber < this.receivedPagesAmount) {
      this.selectPageNumber(this.currentPageNumber + 1);
      this._router.navigate([], {
        relativeTo: this._route,
        queryParamsHandling: 'merge',
        queryParams: {
          page: this.currentPageNumber,
        },
      });
    }
  }

  public selectPageNumber(page: number): void {
    this.selectPage.emit(page);
    this.currentPageNumber = page;
    this._createPaginator();
    this._router.navigate([], {
      relativeTo: this._route,
      queryParamsHandling: 'merge',
      queryParams: {
        page: `${page}`,
      },
    });
  }

  public goFirst(page: number): void {
    this.selectPageNumber(page);
  }

  public goLast(page: number): void {
    this.selectPageNumber(page);
  }

  private _createPaginator(): void {
    this.pagesAmount =
      this._paginationService.createPaginator(this.currentPageNumber, this.receivedPagesAmount);
  }

}
