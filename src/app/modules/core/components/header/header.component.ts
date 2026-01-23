import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, of, Subject, Subscription, takeUntil } from 'rxjs';
import { loginFormFields } from 'src/app/domain/loginFormFields.interface';
import { Users } from 'src/app/domain/users.interface';
import { user } from 'src/app/mock/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private readonly AuthService: AuthService) {}
  user: loginFormFields = {} as loginFormFields;
  isUser = Object.values(this.user).length;
  userIsLoggedin = this.AuthService.isAuthenticated();
  private authSub: Subscription | undefined;
  private _destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.authSub = this.AuthService.isAuth$.subscribe(() => {
      this.userIsLoggedin = this.AuthService.isAuthenticated();
    });

    this.AuthService.value$.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this.user = this.AuthService.getValue();
      if (this.user) {
        this.isUser = Object.values(this.user).length;
      }
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this._destroy$.next();
    this._destroy$.complete();
  }

  @Output() userLogout: EventEmitter<loginFormFields> =
    new EventEmitter<loginFormFields>();

  logout(): void {
    this.AuthService.logout();
    this.userIsLoggedin = this.AuthService.isAuthenticated();
  }
}
