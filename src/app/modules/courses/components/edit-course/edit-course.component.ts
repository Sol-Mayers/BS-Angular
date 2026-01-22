import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { Courses } from 'src/app/domain/courses.interface';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCourseComponent implements OnInit {
  constructor(
    private readonly coursesService: CoursesService,
    private currentRoute: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbsService
  ) {}

  courses: Observable<Courses[]> = this.coursesService.getList();
  @Output() hideCoursePage: EventEmitter<boolean> = new EventEmitter<boolean>();

  currentId: string | null = null;
  // Поля текущего курса
  courseFields!: Observable<Courses | null>;
  // Поля обновлённого курса
  editedCourseFields: Courses = {
    id: '',
    title: '',
    description: '',
    duration: null,
    creationDate: null,
    authors: [],
  };
  createIsAble = false;
  authors = '';

  getCourseFields(): Observable<Courses | null> {
    return this.courses.pipe(
      map((list) => list?.find((c) => c.id == this.currentId) ?? null)
    );
  }

  ngOnInit(): void {
    const idParam = this.currentRoute.snapshot.paramMap.get('id');
    this.currentId = idParam ?? null;

    this.courseFields = this.courses.pipe(
      map(
        (list) =>
          list?.find((c) => {
            return c.id == this.currentId;
          }) ?? null
      ),
      tap((course) => {
        if (course) {
          this.breadcrumbService.emit(course.title);
        }
      })
    );

    this.courseFields.pipe(take(1)).subscribe((course) => {
      if (course) {
        this.editedCourseFields = { ...course };
      } else {
        this.editedCourseFields = {
          id: '',
          title: '',
          description: '',
          duration: null,
          creationDate: null,
          authors: [],
        };
      }
    });
  }

  getName(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  getDescription(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  getDate(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  getDuration(event: Event): number {
    return Number((event.target as HTMLInputElement).value);
  }

  getAuthors(event: Event): string[] {
    // Данный функционал будет доработан, когда будет доработан компонент авторов
    const editedAuthors = (event.target as HTMLInputElement).value;

    return editedAuthors.split(',');
  }

  getInputAuthors(): string {
    return (
      this.editedCourseFields.authors
        ?.map(
          (author) =>
            (author.firstName ? author.firstName : '') +
            ' ' +
            (author.lastName ? author.lastName : '')
        )
        .join(', ') ?? ''
    );
  }

  editCourse(): void {
    this.coursesService
      .updateItem(this.editedCourseFields)
      .pipe(take(1))
      .subscribe();
  }

  cancelCreateNewCourse(event: Event): void {
    event.preventDefault();
  }
}
