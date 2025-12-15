import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { nanoid } from 'nanoid';
import { Courses } from 'src/app/domain/courses.interface';

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewCourseComponent implements OnInit {
  @Input() routes: string[] = [];

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

  createNewCourse(event: Event): void {
    event.preventDefault();
  }

  cancelCreateNewCourse(event: Event): void {
    event.preventDefault();
  }
}
