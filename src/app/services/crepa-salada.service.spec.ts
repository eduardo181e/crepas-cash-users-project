import { TestBed } from '@angular/core/testing';

import { CrepaSaladaService } from './crepa-salada.service';

describe('CrepaSaladaService', () => {
  let service: CrepaSaladaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrepaSaladaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
