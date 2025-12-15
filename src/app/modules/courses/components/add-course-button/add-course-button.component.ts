import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';

@Component({
  selector: 'app-add-course-button',
  templateUrl: './add-course-button.component.html',
  styleUrls: ['./add-course-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCourseButtonComponent {
  @Output() addCourse: EventEmitter<Courses> = new EventEmitter<Courses>();

  addNewCourse(): void {
    this.addCourse.emit();
  }
}
