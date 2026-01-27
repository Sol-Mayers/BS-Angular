import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { loginFormInput } from 'src/app/domain/loginFormFields.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private readonly AuthService: AuthService,
    private readonly router: Router
  ) {}

  @Output() getFields: EventEmitter<loginFormInput> =
    new EventEmitter<loginFormInput>();

  onSubmit(authForm: NgForm): void {
    if (authForm.valid) {
      this.AuthService.login(authForm.value);
      this.router.navigate(['/courses']);
    } else {
      authForm.control.markAllAsTouched();
    }
  }
}
