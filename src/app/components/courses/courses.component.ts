import { Component, Input } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent extends MainComponent {
  deleteCourse(courses: Courses): void {
    console.log(courses.id);
  }

  editCourse(courses: Courses): void {
    console.log(courses);
  }
}
