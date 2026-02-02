import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  @Input() courses: Courses[] = [];
  @Input() isNotFound!: boolean;
  @Output() edit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() courseToEdit: EventEmitter<Courses> = new EventEmitter<Courses>();
  @Output() resetAll: EventEmitter<void> = new EventEmitter<void>();

  getCourseToEdit(courses: Courses): void {
    this.courseToEdit.emit(courses);
  }

  editCourse(courses: Courses): void {
    this.edit.emit(true);
    this.getCourseToEdit(courses);
  }

  showDeleteConfirm(id: string) {
    this.delete.emit(id);
  }

  resetFilters() {
    this.resetAll.emit();
  }
}
