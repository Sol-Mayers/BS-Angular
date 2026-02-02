import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AuthorsEffectsEffects } from './authors-effects.effects';

describe('AuthorsEffectsEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthorsEffectsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorsEffectsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AuthorsEffectsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
