import { TestBed } from '@angular/core/testing';

import { InterpageService } from './interpage.service';

describe('InterpageService', () => {
  let service: InterpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
