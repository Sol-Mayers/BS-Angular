import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromCoursesActions from '../actions/courses-actions.actions';
import { CoursesService } from 'src/app/services/courses.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';

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

  public createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoursesActions.CoursesActions.createCourse),
      switchMap(({ data }) =>
        this.coursesService.addItem(data).pipe(
          map(() =>
            fromCoursesActions.CoursesActions.createCourseSuccess({
              data: data,
            })
          ),
          catchError((error) =>
            of(fromCoursesActions.CoursesActions.createCourseFailure({ error }))
          )
        )
      )
    )
  );

  public updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoursesActions.CoursesActions.updateCourse),
      switchMap(({ data }) =>
        this.coursesService.updateItem(data).pipe(
          map(() =>
            fromCoursesActions.CoursesActions.updateCourseSuccess({
              data: data,
            })
          ),
          catchError((error) =>
            of(fromCoursesActions.CoursesActions.updateCourseFailure({ error }))
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
