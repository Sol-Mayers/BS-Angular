import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { nanoid } from 'nanoid';
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
  courseFields!: Observable<Courses | null>;
  createIsAble = false;

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

  editCourse(): void {
    this.courseFields.pipe(take(1)).subscribe((value) => {
      console.log('current value:', value);
      this.coursesService.updateItem(value!);
    });
    // this.coursesService.updateItem(this.courseFields!);
  }

  cancelCreateNewCourse(event: Event): void {
    event.preventDefault();
  }
}
