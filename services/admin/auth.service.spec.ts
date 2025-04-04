import { TestBed } from '@angular/core/testing';

import { AuthHelperService } from './authHelper.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthHelperService = TestBed.get(AuthHelperService);
    expect(service).toBeTruthy();
  });
});
