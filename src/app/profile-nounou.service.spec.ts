import { TestBed, inject } from '@angular/core/testing';

import { ProfileNounouService } from './profile-nounou.service';

describe('ProfileNounouService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileNounouService]
    });
  });

  it('should be created', inject([ProfileNounouService], (service: ProfileNounouService) => {
    expect(service).toBeTruthy();
  }));
});
