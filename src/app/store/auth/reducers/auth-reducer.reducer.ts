import { createReducer, on } from '@ngrx/store';
import { loginFormFields } from 'src/app/domain/loginFormFields.interface';
import * as fromAuthActions from '../actions/auth-actions.actions';

export const authReducerFeatureKey = 'authReducer';

export interface State {
  user: loginFormFields | null;
  userId: string | null;
  isLoading: boolean;
}

export const initialState: State = {
  user: null,
  userId: null,
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(fromAuthActions.AuthActions.getUserInfo, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(fromAuthActions.AuthActions.getUserInfoSuccess, (state, { data }) => ({
    ...state,
    user: data ? { ...data } : state.user,
    isLoading: false,
  })),
  on(fromAuthActions.AuthActions.getUserInfoFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(fromAuthActions.AuthActions.getLogin, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(fromAuthActions.AuthActions.getLoginSuccess, (state, { data }) => ({
    ...state,
    user: { ...data },
    isLoading: false,
  })),
  on(fromAuthActions.AuthActions.getLoginFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(fromAuthActions.AuthActions.getLogout, (state) => ({
    ...state,
    user: null,
    isLoading: false,
  })),
  on(fromAuthActions.AuthActions.getLogoutSuccess, (state) => ({
    ...state,
    user: null,
    isLoading: false,
  })),
  on(fromAuthActions.AuthActions.getLogoutFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);
