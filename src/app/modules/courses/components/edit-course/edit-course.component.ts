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

  @Input() courses: Courses[] = [];
  @Input() courseToEdit: Courses = {} as Courses;
  @Output() hideCoursePage: EventEmitter<boolean> = new EventEmitter<boolean>();

  currentId: string | null = null;
  // route = 'Редактировать курс';
  courseFields: Courses = {
    id: '',
    title: '',
    description: '',
    duration: null,
    creationDate: null,
    authors: {
      id: '',
      firstName: '',
      lastName: '',
    },
  };
  createIsAble = false;

  ngOnInit(): void {
    this.courses = this.coursesService.getList();
    const idParam = this.currentRoute.snapshot.paramMap.get('id');
    this.currentId = idParam ? idParam : null;
    this.courseFields = this.courses.find((item) => item.id == this.currentId)!;

    this.breadcrumbService.emit(this.courseFields.title);
    // const currentBreadcrumbs = this.breadcrumbService.getCurrentBreadcrumbs();
    // this.breadcrumbs = [...currentBreadcrumbs];
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
    this.coursesService.updateItem(this.courseFields);
  }

  cancelCreateNewCourse(event: Event): void {
    event.preventDefault();
  }
}
