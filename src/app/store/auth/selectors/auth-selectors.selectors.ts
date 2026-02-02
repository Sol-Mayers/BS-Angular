import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth-reducer.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authReducerFeatureKey
);

export const selectIsAuthLoading = createSelector(
  selectAuthState,
  (state) => state.isLoading
);

export const selectAuth = createSelector(
  selectAuthState,
  (state) => state.user
);
