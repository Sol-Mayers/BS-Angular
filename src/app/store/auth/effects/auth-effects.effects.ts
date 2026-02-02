import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as fromAuthActions from '../actions/auth-actions.actions';

@Injectable()
export class AuthEffectsEffects {
  constructor(
    private actions$: Actions,
    private readonly authService: AuthService
  ) {}

  public authEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActions.getUserInfo),
      switchMap(() =>
        this.authService.getUserInfo().pipe(
          map((data) =>
            fromAuthActions.AuthActions.getUserInfoSuccess({ data })
          ),
          catchError((error) =>
            of(fromAuthActions.AuthActions.getUserInfoFailure({ error }))
          )
        )
      )
    )
  );

  public loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActions.getLogin),
      switchMap(({ data }) =>
        this.authService.login(data).pipe(
          map((user) =>
            fromAuthActions.AuthActions.getLoginSuccess({
              data: user,
            })
          ),
          catchError((error) =>
            of(fromAuthActions.AuthActions.getLoginFailure({ error }))
          )
        )
      )
    )
  );

  public logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuthActions.AuthActions.getLogout),
      switchMap(({ data }) =>
        this.authService.logout(data).pipe(
          map(() => fromAuthActions.AuthActions.getLogoutSuccess()),
          catchError((error) =>
            of(fromAuthActions.AuthActions.getLogoutFailure({ error }))
          )
        )
      )
    )
  );
}
