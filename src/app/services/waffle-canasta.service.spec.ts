import { TestBed } from '@angular/core/testing';

import { WaffleCanastaService } from './waffle-canasta.service';

describe('WaffleCanastaService', () => {
  let service: WaffleCanastaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaffleCanastaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
