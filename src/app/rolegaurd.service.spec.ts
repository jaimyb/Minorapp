import { TestBed, inject } from '@angular/core/testing';

import { RolegaurdService } from './rolegaurd.service';

describe('RolegaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolegaurdService]
    });
  });

  it('should be created', inject([RolegaurdService], (service: RolegaurdService) => {
    expect(service).toBeTruthy();
  }));
});
