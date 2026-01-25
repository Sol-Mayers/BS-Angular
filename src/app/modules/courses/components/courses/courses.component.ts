import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, take } from 'rxjs';
import { Courses } from 'src/app/domain/courses.interface';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  @Input() courses: Courses[] = [];
  @Input() isNotFound = false;
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
