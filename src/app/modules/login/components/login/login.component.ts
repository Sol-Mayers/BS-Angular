import { Component, EventEmitter, Output } from '@angular/core';
import { loginFormFields } from 'src/app/domain/loginFormFields.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
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
    this.getFields.emit(this.loginFormFields);
  }
}
