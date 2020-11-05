import { TestBed } from '@angular/core/testing';

import { MortgageService } from './mortgage.service';

describe('MortgageService', () => {
  let service: MortgageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MortgageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
