import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AuthorsEffectsEffects } from './authors-effects.effects';
import { LoaderService } from 'src/app/services/loader.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthorsEffectsEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthorsEffectsEffects;
  let loaderSpy: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoaderService', [
      'loaderIsOn',
      'loaderIsOff',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthorsEffectsEffects,
        provideMockActions(() => actions$),
        { provide: LoaderService, useValue: spy },
      ],
      imports: [HttpClientTestingModule],
    });

    effects = TestBed.inject(AuthorsEffectsEffects);
    loaderSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should have loader spy defined', () => {
    expect(loaderSpy).toBeTruthy();
  });
});
