import { TestBed } from '@angular/core/testing';

import { PuzzleCoachHttpService } from './puzzle-coach-http.service';

describe('PuzzleCoachHttpService', () => {
  let service: PuzzleCoachHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleCoachHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
