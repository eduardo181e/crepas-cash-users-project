import { TestBed } from '@angular/core/testing';

import { CrepaDulceService } from './crepa-dulce.service';

describe('CrepaDulceService', () => {
  let service: CrepaDulceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrepaDulceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
