import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromCourses from './courses/reducers/courses-reducer.reducer';
import * as fromAuth from './auth/reducers/auth-reducer.reducer';
import * as fromAuthors from './authors/reducers/authors-reducer.reducer';

export interface CoursesState {
  [fromCourses.coursesReducerFeatureKey]: fromCourses.State;
  [fromAuth.authReducerFeatureKey]: fromAuth.State;
  [fromAuthors.authorsReducerFeatureKey]: fromAuthors.State;
}

export const reducers: ActionReducerMap<CoursesState> = {
  [fromCourses.coursesReducerFeatureKey]: fromCourses.reducer,
  [fromAuth.authReducerFeatureKey]: fromAuth.reducer,
  [fromAuthors.authorsReducerFeatureKey]: fromAuthors.reducer,
};

export const metaReducers: MetaReducer<CoursesState>[] = isDevMode() ? [] : [];
