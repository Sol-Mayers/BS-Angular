import { Component } from '@angular/core';
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
}
