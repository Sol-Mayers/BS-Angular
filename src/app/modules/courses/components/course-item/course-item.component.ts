import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
  providers: [ConfirmationService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent {
  @Input() course: Courses = {} as Courses;
  @Output() edit: EventEmitter<Courses> = new EventEmitter<Courses>();
  @Output() confirm: EventEmitter<string> = new EventEmitter<string>();

  editCourse(): void {
    this.edit.emit(this.course);
  }

  showDeleteConfirm(id: string): void {
    this.confirm.emit(id);
  }
}
