import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationInputComponent {
  @Input() courseFields: Courses = {} as Courses;

  getDuration(event: Event): number {
    return Number((event.target as HTMLInputElement).value);
  }
}
