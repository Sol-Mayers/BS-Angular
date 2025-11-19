import { Component } from '@angular/core';
import { user } from 'src/app/mock/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user = user;
}
