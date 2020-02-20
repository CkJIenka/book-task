import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {


  constructor() { }

  public createPaginator(currentPageNumber: number, receivedPageNumber: number): any {
    const pagesAmount = [];
    if (receivedPageNumber === 0) {
      pagesAmount.push(1);
    } else
    if (currentPageNumber === 1 && currentPageNumber + 2 <= receivedPageNumber) {
      for (let i = currentPageNumber; i <= currentPageNumber + 2; i++) {
        pagesAmount.push(i);
      }
    } else
    if (currentPageNumber === 1 && currentPageNumber + 2 > receivedPageNumber) {
      for (let i = currentPageNumber; i <= receivedPageNumber; i++) {
        pagesAmount.push(i);
      }
    } else
    if (currentPageNumber + 2 <= receivedPageNumber && currentPageNumber > 1) {
      for (let i = currentPageNumber - 1; i <= currentPageNumber + 1; i++) {
        pagesAmount.push(i);
      }
    } else
    if (currentPageNumber + 2 > receivedPageNumber && currentPageNumber !== receivedPageNumber) {
      for (let i = currentPageNumber - 1; i <= currentPageNumber + 1; i++) {
        pagesAmount.push(i);
      }
    } else
    if (currentPageNumber === receivedPageNumber) {
      for (let i = currentPageNumber - 2; i <= currentPageNumber; i++) {
        pagesAmount.push(i);
      }
    }

    return pagesAmount;
  }

}
