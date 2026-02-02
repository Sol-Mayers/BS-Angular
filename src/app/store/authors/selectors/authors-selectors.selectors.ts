import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuthors from '../reducers/authors-reducer.reducer';

export const selectAuthorsState = createFeatureSelector<fromAuthors.State>(
  fromAuthors.authorsReducerFeatureKey
);

export const selectIsCoursesLoading = createSelector(
  selectAuthorsState,
  (state) => state.isLoading
);

export const selectAuthors = createSelector(
  selectAuthorsState,
  (state) => state.authors
);

export const selectAuthorsCount = createSelector(
  selectAuthors,
  (authors) => authors.length
);
