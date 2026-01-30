import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromCoursesActions from '../actions/courses-actions.actions';
import { CoursesService } from 'src/app/services/courses.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CoursesQueryParams } from 'src/app/domain/courses.interface';

@Injectable()
export class CoursesEffectsEffects {
  constructor(
    private actions$: Actions,
    private readonly coursesService: CoursesService
  ) {}

  public coursesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoursesActions.CoursesActions.getCourses),
      switchMap(({ data }) =>
        this.coursesService.getList(data).pipe(
          map((data) =>
            fromCoursesActions.CoursesActions.getCoursesSuccess({ data })
          ),
          catchError((error) =>
            of(fromCoursesActions.CoursesActions.getCoursesFailure({ error }))
          )
        )
      )
    )
  );

  public deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoursesActions.CoursesActions.deleteCourse),
      switchMap(({ data }) =>
        this.coursesService.removeItem(data).pipe(
          map(() =>
            fromCoursesActions.CoursesActions.deleteCourseSuccess({ id: data })
          ),
          catchError((error) =>
            of(fromCoursesActions.CoursesActions.getCoursesFailure({ error }))
          )
        )
      )
    )
  );

  public getCoursesSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromCoursesActions.CoursesActions.getCoursesSuccess),
        tap(() => console.log('Courses loaded'))
      ),
    { dispatch: false }
  );
}
