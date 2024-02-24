import { TestBed } from '@angular/core/testing';

import { BebidasFriasService } from './bebidas-frias.service';

describe('BebidasFriasService', () => {
  let service: BebidasFriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BebidasFriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
