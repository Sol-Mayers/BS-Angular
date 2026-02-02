import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AuthEffectsEffects } from './auth-effects.effects';

describe('AuthEffectsEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffectsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffectsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AuthEffectsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
