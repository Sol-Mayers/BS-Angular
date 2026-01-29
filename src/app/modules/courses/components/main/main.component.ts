import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Courses, CoursesQueryParams } from 'src/app/domain/courses.interface';
import { FilterPipe } from '../search/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses.service';
import { SearchComponent } from '../search/search.component';
import { BehaviorSubject, finalize, Observable, Subject, take } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrderByPipe } from './pipes/order-by.pipe';
import { Store } from '@ngrx/store';
import { CoursesState } from 'src/app/store';
import { selectCourses } from 'src/app/store/courses/selectors/courses-selectors.selectors';
import { CoursesActions } from 'src/app/store/courses/actions/courses-actions.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly store: Store<CoursesState>
  ) {}

  @ViewChild('searchComponent') child!: SearchComponent;

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
  private destroy$ = new Subject<void>();

  private cachedCourses: Courses[] = [];

  // private coursesSubject = new BehaviorSubject<Courses[]>([]);
  // courses$ = this.coursesSubject.asObservable();
  courses$: Observable<Courses[]> = this.store.select(selectCourses);

  ngOnInit(): void {
    // this.store.select(selectCourses).subscribe((data) => {
    //   const combined = [...this.cachedCourses, ...data];
    //   const unique = combined.filter(
    //     (item, idx, self) => idx === self.findIndex((t) => t.id === item.id)
    //   );
    //   this.cachedCourses = unique;
    //   this.coursesSubject.next(this.cachedCourses);

    //   if (this.cachedCourses.length % 10) {
    //     this.showMoreButton = false;
    //   } else {
    //     this.showMoreButton = true;
    //   }
    // });

    this.store.dispatch(
      CoursesActions.getCourses({ data: this.mainCoursesQueryprops })
    );

    this.courses$?.subscribe((courses) => {
      if (courses.length < 10 || courses.length % 10) {
        this.showMoreButton = false;
      } else {
        this.showMoreButton = true;
      }

      this.isNotFound = courses.length === 0;
    });
  }

  loadMore(itemsCount: number) {
    if (!this.mainCoursesQueryprops.params) {
      this.mainCoursesQueryprops.params = { _limit: '10' };
    }
    const current = Number(this.mainCoursesQueryprops.params._limit);
    const newLimit = current + itemsCount;
    this.mainCoursesQueryprops = {
      ...this.mainCoursesQueryprops,
      params: {
        ...this.mainCoursesQueryprops.params,
        _limit: String(newLimit),
      },
    };

    this.store.dispatch(
      CoursesActions.getCourses({ data: this.mainCoursesQueryprops })
    );
  }

  findCourse(text: string): void {
    const props: CoursesQueryParams = {
      ...this.mainCoursesQueryprops,
      filter: text,
    };

    this.store.dispatch(CoursesActions.getCourses({ data: props }));

    // this.coursesService.getList(props).subscribe((data) => {
    //   this.isNotFound = data.length === 0;
    //   this.cachedCourses = data;
    //   this.coursesSubject.next(this.cachedCourses);
    // });
  }
  getCourseToEdit(item: Courses): void {
    this.courseToEdit = item;
  }
  resetFilters() {
    this.store.dispatch(
      CoursesActions.getCourses({ data: this.mainCoursesQueryprops })
    );
    // this.coursesService
    //   .getList(this.mainCoursesQueryprops)
    //   .subscribe((data) => {
    //     this.isNotFound = false;
    //     this.cachedCourses = [...data];
    //     // this.coursesSubject.next(this.cachedCourses);
    //   });
  }
  showDeleteConfirm(id: string): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить этот курс?',
      header: 'Подтвердите удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.coursesService
          .removeItem(id)
          .pipe(take(1))
          .subscribe(() => {
            this.cachedCourses = this.cachedCourses.filter(
              (item) => item.id != id
            );
            // this.coursesSubject.next(this.cachedCourses);
          });

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
