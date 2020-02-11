import { TestBed } from '@angular/core/testing';

import { BooksListService } from './books-list.service';

describe('BookListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BooksListService = TestBed.get(BooksListService);
    expect(service).toBeTruthy();
  });
});
