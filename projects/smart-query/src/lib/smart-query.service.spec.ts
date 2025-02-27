import { TestBed } from '@angular/core/testing';

import { SmartQueryService } from './smart-query.service';

describe('SmartQueryService', () => {
  let service: SmartQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
