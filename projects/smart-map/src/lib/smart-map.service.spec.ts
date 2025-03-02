import { TestBed } from '@angular/core/testing';

import { SmartMapService } from './smart-map.service';

describe('SmartMapService', () => {
  let service: SmartMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
