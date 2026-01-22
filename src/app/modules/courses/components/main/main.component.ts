import { Component, OnInit, ViewChild } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';
import { FilterPipe } from '../search/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses.service';
import { SearchComponent } from '../search/search.component';
import { Observable, take } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) {}

  @ViewChild('searchComponent') child!: SearchComponent;

  courses: Observable<Courses[]> | null = null;
  courseToEdit: Courses = {} as Courses;
  filter = new FilterPipe();
  isNotFound = false;

  ngOnInit(): void {
    this.courses = this.coursesService.getList();
  }

  findCourse(text: string): void {
    // this.courses = this.filter.transform(courses, 'title', text);
    this.courses = this.coursesService.getList(text);
    this.courses.subscribe((data) => {
      if (data.length === 0) {
        this.isNotFound = true;
      } else {
        this.isNotFound = false;
      }
    });
  }
  getCourseToEdit(item: Courses): void {
    this.courseToEdit = item;
  }
  resetFilters() {
    this.courses = this.coursesService.getList();
    this.child.clearInput();
    this.isNotFound = false;
  }
  showDeleteConfirm(id: string): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить этот курс?',
      header: 'Подтвердите удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.coursesService.removeItem(id).pipe(take(1)).subscribe();
        this.courses = this.coursesService.getList();
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
