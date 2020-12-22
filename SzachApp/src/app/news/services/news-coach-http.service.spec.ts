import { TestBed } from '@angular/core/testing';

import { NewsCoachHttpService } from './news-coach-http.service';

describe('NewsCoachHttpService', () => {
  let service: NewsCoachHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsCoachHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
