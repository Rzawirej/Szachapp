import { TestBed } from '@angular/core/testing';

import { DebutCoachHttpService } from './debut-coach-http.service';

describe('DebutCoachHttpService', () => {
  let service: DebutCoachHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebutCoachHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
