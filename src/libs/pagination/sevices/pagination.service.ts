import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {

  constructor() { }

  public createPaginator(currentPageNumber: number, receivedPageAmount: number): any {
    const pagesAmount = [];
    if (receivedPageAmount === 0) {
      pagesAmount.push(1);
    } else
    if (currentPageNumber === 1 && currentPageNumber + 2 <= receivedPageAmount) {
      for (let i = currentPageNumber; i <= currentPageNumber + 2; i++) {
        pagesAmount.push(i);
      }
    } else
    if (currentPageNumber === 1 && currentPageNumber + 2 > receivedPageAmount) {
      for (let i = currentPageNumber; i <= receivedPageAmount; i++) {
        pagesAmount.push(i);
      }
    } else
    if (currentPageNumber + 2 <= receivedPageAmount && currentPageNumber > 1) {
      for (let i = currentPageNumber - 1; i <= currentPageNumber + 1; i++) {
        pagesAmount.push(i);
      }
    } else
    if (currentPageNumber + 2 > receivedPageAmount && currentPageNumber !== receivedPageAmount) {
      for (let i = currentPageNumber - 1; i <= currentPageNumber + 1; i++) {
        pagesAmount.push(i);
      }
    } else
    if (currentPageNumber === receivedPageAmount) {
      for (let i = currentPageNumber - 2; i <= currentPageNumber; i++) {
        pagesAmount.push(i);
      }
    }

    return pagesAmount;
  }

}
