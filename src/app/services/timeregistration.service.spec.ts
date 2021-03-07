import { TestBed } from '@angular/core/testing';

import { TimeregistrationService } from './timeregistration.service';

describe('TimeregistrationService', () => {
  let service: TimeregistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeregistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
