import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { loginFormFields } from 'src/app/domain/loginFormFields.interface';
import { user } from 'src/app/mock/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private readonly AuthService: AuthService) {}
  user = user;
  userIsLoggedin = this.AuthService.isAuthenticated();
  private authSub: Subscription | undefined;

  ngOnInit(): void {
    this.authSub = this.AuthService.isAuth$.subscribe(() => {
      this.userIsLoggedin = this.AuthService.isAuthenticated();
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  @Output() userLogout: EventEmitter<loginFormFields> =
    new EventEmitter<loginFormFields>();

  logout(): void {
    this.AuthService.logout();
    this.userIsLoggedin = this.AuthService.isAuthenticated();
  }
}
