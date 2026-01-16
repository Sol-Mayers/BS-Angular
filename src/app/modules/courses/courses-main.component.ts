import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-courses-main',
  templateUrl: './courses-main.component.html',
  styleUrls: ['./courses-main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesMainComponent {}
