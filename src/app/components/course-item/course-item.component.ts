import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
})
export class CourseItemComponent {
  @Input() course: Courses = {} as Courses;
  @Output() delete: EventEmitter<Courses> = new EventEmitter<Courses>();
  @Output() edit: EventEmitter<Courses> = new EventEmitter<Courses>();

  deleteCourse(): void {
    this.delete.emit(this.course);
  }

  editCourse(): void {
    this.edit.emit(this.course);
  }
}
