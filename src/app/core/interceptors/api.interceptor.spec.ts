import { TestBed } from '@angular/core/testing';

import { ApiInterceptor } from './api.interceptor';

describe('ApiInterceptor', () => {
  let interceptor: ApiInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiInterceptor,
      ],
    });
    interceptor = TestBed.inject(ApiInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
