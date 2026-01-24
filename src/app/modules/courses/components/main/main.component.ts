import { Component, OnInit, ViewChild } from '@angular/core';
import { Courses, CoursesQueryParams } from 'src/app/domain/courses.interface';
import { FilterPipe } from '../search/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses.service';
import { SearchComponent } from '../search/search.component';
import { Observable, take } from 'rxjs';
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
  mainCoursesQueryprops: CoursesQueryParams = {
    params: {
      _limit: '10',
    },
  };

  ngOnInit(): void {
    this.courses = this.coursesService.getList(this.mainCoursesQueryprops);
  }

  loadMore(itemsCount: number) {
    if (!this.mainCoursesQueryprops.params) {
      this.mainCoursesQueryprops.params = { _limit: '10' };
    }
    const current = Number(this.mainCoursesQueryprops.params._limit);
    const newLimit = current + itemsCount;
    this.mainCoursesQueryprops.params._limit = String(newLimit);

    this.courses = this.coursesService.getList(this.mainCoursesQueryprops);
  }

  findCourse(text: string): void {
    const props: CoursesQueryParams = {
      filter: text,
    };
    this.courses = this.coursesService.getList(props);
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
    this.courses = this.coursesService.getList(this.mainCoursesQueryprops);
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
        this.courses = this.coursesService.getList(this.mainCoursesQueryprops);
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
