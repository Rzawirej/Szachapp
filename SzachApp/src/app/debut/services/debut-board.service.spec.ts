import { TestBed } from '@angular/core/testing';

import { DebutBoardService } from './debut-board.service';

describe('DebutBoardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DebutBoardService = TestBed.get(DebutBoardService);
    expect(service).toBeTruthy();
  });
});
