import { Component, Input } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  constructor(private readonly coursesService: CoursesService) {}
  @Input() courses: Courses[] = [];

  deleteCourse(id: string): void {
    this.coursesService.removeItem(id);
    this.courses = this.coursesService.getList();
  }

  editCourse(courses: Courses): void {
    console.log(courses);
  }
}
