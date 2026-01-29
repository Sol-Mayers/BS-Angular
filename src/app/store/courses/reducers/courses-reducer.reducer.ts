import { createReducer, on } from '@ngrx/store';
import { Courses } from 'src/app/domain/courses.interface';
import * as fromCoursesActions from '../actions/courses-actions.actions';

export const coursesReducerFeatureKey = 'courses';

export interface State {
  isLoading: boolean;
  courses: Courses[];
  courseId: string | null;
}

export const initialState: State = {
  isLoading: false,
  courses: [],
  courseId: null,
};

export const reducer = createReducer(
  initialState,
  on(fromCoursesActions.CoursesActions.getCourses, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(
    fromCoursesActions.CoursesActions.getCoursesSuccess,
    (state, { data }) => ({ ...state, courses: [...data], isLoading: false })
  ),
  on(fromCoursesActions.CoursesActions.getCoursesFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);
