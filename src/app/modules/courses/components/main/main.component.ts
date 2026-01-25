import { Component, OnInit, ViewChild } from '@angular/core';
import { Courses, CoursesQueryParams } from 'src/app/domain/courses.interface';
import { FilterPipe } from '../search/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses.service';
import { SearchComponent } from '../search/search.component';
import { BehaviorSubject, finalize, Observable, of, take } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrderByPipe } from './pipes/order-by.pipe';

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
  orderBy = new OrderByPipe();
  isNotFound = false;
  mainCoursesQueryprops: CoursesQueryParams = {
    params: {
      _limit: '10',
      _sort: 'creationDate',
      _order: 'desc',
    },
  };
  showMoreButton = true;

  private cachedCourses: Courses[] = [];

  private coursesSubject = new BehaviorSubject<Courses[]>([]);
  courses$ = this.coursesSubject.asObservable();

  ngOnInit(): void {
    this.coursesService
      .getList(this.mainCoursesQueryprops)
      .subscribe((data) => {
        this.cachedCourses = [...data];
        this.coursesSubject.next(this.cachedCourses);
      });
  }

  loadMore(itemsCount: number) {
    const savedScroll =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (!this.mainCoursesQueryprops.params) {
      this.mainCoursesQueryprops.params = { _limit: '10' };
    }
    const current = Number(this.mainCoursesQueryprops.params._limit);
    const newLimit = current + itemsCount;
    this.mainCoursesQueryprops.params._limit = String(newLimit);

    this.coursesService
      .getList(this.mainCoursesQueryprops)
      .pipe(
        finalize(() => {
          // Возврат прокрутки после подгрузки
          setTimeout(() => {
            window.scrollTo({ top: savedScroll, behavior: 'auto' });
          }, 0);
        })
      )
      .subscribe((data) => {
        const combined = [...this.cachedCourses, ...data];
        const unique = combined.filter(
          (item, idx, self) => idx === self.findIndex((t) => t.id === item.id)
        );
        this.cachedCourses = unique;
        this.coursesSubject.next(this.cachedCourses);

        if (this.cachedCourses.length % 10) {
          this.showMoreButton = false;
        }
      });
  }

  findCourse(text: string): void {
    const props: CoursesQueryParams = { filter: text };
    this.coursesService.getList(props).subscribe((data) => {
      this.isNotFound = data.length === 0;
      this.cachedCourses = data;
      this.coursesSubject.next(this.cachedCourses);
    });
  }
  getCourseToEdit(item: Courses): void {
    this.courseToEdit = item;
  }
  resetFilters() {
    this.coursesService
      .getList(this.mainCoursesQueryprops)
      .subscribe((data) => {
        this.cachedCourses = [...data];
        this.coursesSubject.next(this.cachedCourses);
      });
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
