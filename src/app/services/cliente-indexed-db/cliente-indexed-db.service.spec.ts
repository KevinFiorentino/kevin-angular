import { TestBed } from '@angular/core/testing';

import { ClienteIndexedDbService } from './cliente-indexed-db.service';

describe('ClienteIndexedDbService', () => {
  let service: ClienteIndexedDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteIndexedDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
