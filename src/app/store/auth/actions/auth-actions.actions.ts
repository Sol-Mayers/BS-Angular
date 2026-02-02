import {
  createAction,
  createActionGroup,
  props,
  emptyProps,
} from '@ngrx/store';
import { loginFormFields } from 'src/app/domain/loginFormFields.interface';

export const AuthActions = createActionGroup({
  source: 'AuthActions',
  events: {
    'Get User Info': emptyProps(),
    'Get User Info Success': props<{ data: loginFormFields | null }>(),
    'Get User Info Failure': props<{ error: unknown }>(),
    'Get Login': props<{ data: loginFormFields }>(),
    'Get Login Success': props<{ data: loginFormFields }>(),
    'Get Login Failure': props<{ error: unknown }>(),
    'Get Logout': props<{ data: string }>(),
    'Get Logout Success': emptyProps(),
    'Get Logout Failure': props<{ error: unknown }>(),
  },
});
