import { Component, EventEmitter, Input, Output } from '@angular/core';
import { loginFormFields } from 'src/app/domain/loginFormFields.interface';
import { user } from 'src/app/mock/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private readonly authService: AuthService) {}
  user = user;
  @Input() userIsLoggedin = false;

  @Output() userLogout: EventEmitter<loginFormFields> =
    new EventEmitter<loginFormFields>();

  logout(): void {
    this.userLogout.emit();
  }
}
