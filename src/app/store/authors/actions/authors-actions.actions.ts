import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Authors } from 'src/app/domain/authors.interface';

export const AuthorsActions = createActionGroup({
  source: 'AuthorsActions',
  events: {
    'Get Authors': emptyProps(),
    'Get Authors Success': props<{ data: Authors[] }>(),
    'Get Authors Failure': props<{ error: unknown }>(),
  },
});
