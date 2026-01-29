import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import * as fromCourses from './courses/reducers/courses-reducer.reducer';

export interface CoursesState {
  [fromCourses.coursesReducerFeatureKey]: fromCourses.State;
}

export const reducers: ActionReducerMap<CoursesState> = {
  [fromCourses.coursesReducerFeatureKey]: fromCourses.reducer,
};

export const metaReducers: MetaReducer<CoursesState>[] = isDevMode() ? [] : [];
