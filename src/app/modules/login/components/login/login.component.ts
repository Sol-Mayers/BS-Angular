import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  loginFormFields,
  loginFormInput,
} from 'src/app/domain/loginFormFields.interface';
import { AuthService } from 'src/app/services/auth.service';
import { AuthActions } from 'src/app/store/auth/actions/auth-actions.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private readonly router: Router,
    private readonly store: Store<loginFormFields>
  ) {}

  onSubmit(authForm: NgForm): void {
    if (authForm.valid) {
      this.store.dispatch(AuthActions.getLogin({ data: authForm.value }));
      this.router.navigate(['/courses']);
    } else {
      authForm.control.markAllAsTouched();
    }
  }
}
