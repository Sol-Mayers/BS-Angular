import { createActionGroup, props } from '@ngrx/store';
import { Courses, CoursesQueryParams } from 'src/app/domain/courses.interface';

export const CoursesActions = createActionGroup({
  source: 'CoursesActions',
  events: {
    'Get Courses': props<{ data: CoursesQueryParams }>(),
    'Get Courses Success': props<{ data: Courses[] }>(),
    'Get Courses Failure': props<{ error: unknown }>(),
    'Delete Course': props<{ data: string }>(),
    'Delete Course Success': props<{ id: string }>(),
    'Delete Course Failure': props<{ error: unknown }>(),
    'Create Course': props<{ data: Courses }>(),
    'Create Course Success': props<{ data: Courses }>(),
    'Create Course Failure': props<{ error: unknown }>(),
    'Update Course': props<{ data: Courses }>(),
    'Update Course Success': props<{ data: Courses }>(),
    'Update Course Failure': props<{ error: unknown }>(),
  },
});
