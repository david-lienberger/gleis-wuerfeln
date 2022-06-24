import { TestBed } from '@angular/core/testing';

import { TransportApiService } from './transport-api.service';

describe('TransportApiService', () => {
  let service: TransportApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
