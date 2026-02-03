import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AuthEffectsEffects } from './auth-effects.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoaderService } from 'src/app/services/loader.service';

describe('AuthEffectsEffects', () => {
  const actions$ = new Observable<any>();
  let effects: AuthEffectsEffects;
  let loaderSpy: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoaderService', [
      'loaderIsOn',
      'loaderIsOff',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthEffectsEffects,
        provideMockActions(() => actions$),
        { provide: LoaderService, useValue: spy },
      ],
    });

    loaderSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    effects = TestBed.inject(AuthEffectsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should have loader spy defined', () => {
    expect(loaderSpy).toBeTruthy();
  });
});
