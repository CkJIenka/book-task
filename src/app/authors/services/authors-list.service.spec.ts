import { TestBed } from '@angular/core/testing';

import { AuthorsListService } from './authors-list.service';

describe('AuthorsListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorsListService = TestBed.get(AuthorsListService);
    expect(service).toBeTruthy();
  });
});
