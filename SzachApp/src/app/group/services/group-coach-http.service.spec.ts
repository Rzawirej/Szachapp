import { TestBed } from '@angular/core/testing';

import { GroupCoachHttpService } from './group-coach-http.service';

describe('GroupCoachHttpService', () => {
  let service: GroupCoachHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupCoachHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
