import { Component, EventEmitter, Output } from '@angular/core';
import { loginFormInput } from 'src/app/domain/loginFormFields.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private readonly AuthService: AuthService) {}
  loginFormFields: loginFormInput = {
    email: '',
    password: '',
  };
  @Output() getFields: EventEmitter<loginFormInput> =
    new EventEmitter<loginFormInput>();

  getEmail(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  getPassword(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  getloginFormFields(event: Event): void {
    event.preventDefault();
    this.AuthService.login(this.loginFormFields);
  }
}
