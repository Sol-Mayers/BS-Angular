import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Courses } from 'src/app/domain/courses.interface';

@Component({
  selector: 'app-duration-edit-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationInputEditComponent {
  @Input() courseFields: Courses = {} as Courses;
  @Input() editedCourseFields: Courses = {} as Courses;
  @Input() duration!: FormControl;

  getDuration(event: Event): number {
    return Number((event.target as HTMLInputElement).value);
  }
}
