import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { loginFormFields } from 'src/app/domain/loginFormFields.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesState } from 'src/app/store';
import { AuthActions } from 'src/app/store/auth/actions/auth-actions.actions';
import {
  selectAuth,
  selectIsAuthLoading,
} from 'src/app/store/auth/selectors/auth-selectors.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    public readonly router: Router,
    private readonly store: Store<CoursesState>,
    private readonly authService: AuthService
  ) {}
  currentUser: Observable<loginFormFields | null> =
    this.store.select(selectAuth);
  showUserInfo = false;
  isLoadingNow: Observable<boolean> = this.store.select(selectIsAuthLoading);

  private _destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.authService.value$.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.store.dispatch(AuthActions.getUserInfo());
    });
  }

  logout(id?: string): void {
    if (id) {
      this.store.dispatch(AuthActions.getLogout({ data: id }));
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
