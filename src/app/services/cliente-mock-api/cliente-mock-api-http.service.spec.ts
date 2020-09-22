import { TestBed } from '@angular/core/testing';

import { ClienteMockApiHTTPService } from './cliente-mock-api-http.service';

describe('ClienteMockApiHTTPService', () => {
  let service: ClienteMockApiHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteMockApiHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
