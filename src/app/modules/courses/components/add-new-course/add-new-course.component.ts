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
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewCourseComponent implements OnInit {
  constructor(private readonly coursesService: CoursesService) {}
  @Input() routes: string[] = [];
  @Output() hideCoursePage: EventEmitter<boolean> = new EventEmitter<boolean>();

  route = 'Новый курс';
  courseFields: Courses = {
    id: nanoid(5),
    title: '',
    description: '',
    duration: null,
    creationDate: null,
    authors: {
      id: nanoid(10),
      firstName: '',
      lastName: '',
    },
  };
  createIsAble = false;

  ngOnInit(): void {
    this.routes.push(this.route);
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

  addNewCourse(): void {
    this.coursesService.addItem(this.courseFields);
  }
}
