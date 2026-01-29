import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CoursesEffectsEffects } from './courses-effects.effects';

describe('CoursesEffectsEffects', () => {
  let actions$: Observable<any>;
  let effects: CoursesEffectsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoursesEffectsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CoursesEffectsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
