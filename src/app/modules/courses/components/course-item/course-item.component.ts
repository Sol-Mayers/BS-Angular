import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class CourseItemComponent {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  @Input() course: Courses = {} as Courses;
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() edit: EventEmitter<Courses> = new EventEmitter<Courses>();

  deleteCourse(id: string): void {
    this.delete.emit(id);
  }

  editCourse(): void {
    this.edit.emit(this.course);
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
