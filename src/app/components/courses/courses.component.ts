import { Component, Input } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  @Input() courses: Courses[] = [];

  deleteCourse(courses: Courses): void {
    console.log(courses.id);
  }

  editCourse(courses: Courses): void {
    console.log(courses);
  }
}
