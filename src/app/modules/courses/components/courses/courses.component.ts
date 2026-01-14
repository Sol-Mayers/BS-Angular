import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Courses } from 'src/app/domain/courses.interface';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) {}

  @Input() courses: Courses[] = [];
  @Output() edit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() courseToEdit: EventEmitter<Courses> = new EventEmitter<Courses>();

  deleteCourse(id: string): void {
    this.coursesService.removeItem(id);
    this.courses = this.coursesService.getList();
  }

  getCourseToEdit(courses: Courses): void {
    this.courseToEdit.emit(courses);
  }

  editCourse(courses: Courses): void {
    this.edit.emit(true);
    this.getCourseToEdit(courses);
  }

  showConfirm(id: string) {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить этот курс?',
      header: 'Подтвердите удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCourse(id);
        this.messageService.add({
          severity: 'success',
          summary: 'Подтверждено',
          detail: 'Курс удалён',
        });
      },
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
    });
  }
}
