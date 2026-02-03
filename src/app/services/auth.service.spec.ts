import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('AuthService', () => {
  let service: AuthService;
  let loaderSpy: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoaderService', [
      'loaderIsOn',
      'loaderIsOff',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState: {} }),
        { provide: LoaderService, useValue: spy },
      ],
    });

    loaderSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialized loaderSpy', () => {
    expect(loaderSpy).toBeTruthy();
  });
});
