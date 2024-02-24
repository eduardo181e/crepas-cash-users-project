import { TestBed } from '@angular/core/testing';

import { WaffleService } from './waffle.service';

describe('WaffleService', () => {
  let service: WaffleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaffleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
