import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Courses, CoursesQueryParams } from 'src/app/domain/courses.interface';
import { FilterPipe } from '../search/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses.service';
import { SearchComponent } from '../search/search.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrderByPipe } from './pipes/order-by.pipe';
import { Store } from '@ngrx/store';
import { CoursesState } from 'src/app/store';
import {
  selectCourses,
  selectIsCoursesLoading,
} from 'src/app/store/courses/selectors/courses-selectors.selectors';
import { CoursesActions } from 'src/app/store/courses/actions/courses-actions.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly store: Store<CoursesState>
  ) {}

  @ViewChild('searchComponent') child!: SearchComponent;

  courseToEdit: Courses = {} as Courses;
  filter = new FilterPipe();
  orderBy = new OrderByPipe();
  isLoadingNow: Observable<boolean> = this.store.select(selectIsCoursesLoading);
  isNotFound = false;
  amountOfCourses: number | null = null;
  mainCoursesQueryprops: CoursesQueryParams = {
    params: {
      _limit: '10',
      _sort: 'creationDate',
      _order: 'desc',
    },
  };
  showMoreButton = true;
  private destroy$ = new Subject<void>();

  courses$: Observable<Courses[]> = this.store.select(selectCourses);

  ngOnInit(): void {
    this.store.dispatch(
      CoursesActions.getCourses({ data: this.mainCoursesQueryprops })
    );

    this.courses$?.pipe(takeUntil(this.destroy$)).subscribe((courses) => {
      this.amountOfCourses = courses.length;
      if (courses.length < 10 || courses.length % 10) {
        this.showMoreButton = false;
      } else {
        this.showMoreButton = true;
      }
    });

    this.isLoadingNow.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (data === false && this.amountOfCourses === 0) {
        this.isNotFound = true;
      } else {
        this.isNotFound = false;
      }
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
  }

  getCourseToEdit(item: Courses): void {
    this.courseToEdit = item;
  }

  resetFilters() {
    this.store.dispatch(
      CoursesActions.getCourses({ data: this.mainCoursesQueryprops })
    );
  }

  showDeleteConfirm(id: string): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить этот курс?',
      header: 'Подтвердите удаление',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(CoursesActions.deleteCourse({ data: id }));

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
