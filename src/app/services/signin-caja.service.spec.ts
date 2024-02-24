import { TestBed } from '@angular/core/testing';

import { SigninCajaService } from './signin-caja.service';

describe('SigninCajaService', () => {
  let service: SigninCajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigninCajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
