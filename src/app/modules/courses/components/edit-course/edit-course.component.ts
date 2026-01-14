import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { nanoid } from 'nanoid';
import { Courses } from 'src/app/domain/courses.interface';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditCourseComponent implements OnInit {
  constructor(private readonly coursesService: CoursesService) {}
  @Input() courses: Courses[] = [];
  @Input() routes: string[] = [];
  @Input() courseToEdit: Courses = {} as Courses;
  @Output() hideCoursePage: EventEmitter<boolean> = new EventEmitter<boolean>();

  route = 'Редактировать курс';
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
    this.routes.push(this.route);
    this.courseFields = this.courseToEdit;
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

  editCourse(item: boolean): void {
    this.hideCoursePage.emit(item);
    this.coursesService.updateItem(this.courseFields);
  }

  cancelCreateNewCourse(event: Event): void {
    event.preventDefault();
  }
}
