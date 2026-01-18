import { Component } from '@angular/core';
import { loginFormFields } from './domain/loginFormFields.interface';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private readonly AuthService: AuthService) {}
  userIsLoggedin = this.AuthService.isAuthenticated();
  title = 'my-app';

  getloginFormFields(loginFormFields: loginFormFields): void {
    this.AuthService.login(loginFormFields);
    // this.userIsLoggedin = this.AuthService.isAuthenticated();
  }

  logout(): void {
    this.AuthService.logout();
    // this.userIsLoggedin = this.AuthService.isAuthenticated();
  }
}
