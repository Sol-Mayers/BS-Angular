import { Component, EventEmitter, Output } from '@angular/core';
import { loginFormFields } from 'src/app/domain/loginFormFields.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private readonly AuthService: AuthService) {}
  loginFormFields: loginFormFields = {
    emailText: '',
    passwordText: '',
  };
  @Output() getFields: EventEmitter<loginFormFields> =
    new EventEmitter<loginFormFields>();

  getEmail(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  getPassword(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  getloginFormFields(event: Event): void {
    event.preventDefault();
    // this.getFields.emit(this.loginFormFields);
    this.AuthService.login(this.loginFormFields);
  }
}
