import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Courses, CoursesQueryParams } from 'src/app/domain/courses.interface';

export const CoursesActions = createActionGroup({
  source: 'CoursesActions',
  events: {
    'Get Courses': props<{ data: CoursesQueryParams }>(),
    'Get Courses Success': props<{ data: Courses[] }>(),
    'Get Courses Failure': props<{ error: unknown }>(),
  },
});
