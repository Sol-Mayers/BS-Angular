import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthorsService } from 'src/app/services/authors.service';
import * as fromAuthorsActions from '../actions/authors-actions.actions';

@Injectable()
export class AuthorsEffectsEffects {
  constructor(
    private actions$: Actions,
    private readonly authorsService: AuthorsService
  ) {}

  public authorsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthorsActions.AuthorsActions.getAuthors),
      switchMap(() =>
        this.authorsService.getAuthors().pipe(
          map((data) =>
            fromAuthorsActions.AuthorsActions.getAuthorsSuccess({ data })
          ),
          catchError((error) =>
            of(fromAuthorsActions.AuthorsActions.getAuthorsFailure({ error }))
          )
        )
      )
    )
  );

  public getAuthorsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuthorsActions.AuthorsActions.getAuthorsSuccess),
        tap(() => console.log('Authors loaded'))
      ),
    { dispatch: false }
  );
}
