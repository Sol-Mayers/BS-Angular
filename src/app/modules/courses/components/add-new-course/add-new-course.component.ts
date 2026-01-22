import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { nanoid } from 'nanoid';
import { take } from 'rxjs';
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
    authors: [],
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

  getDuration(event: Event): number {
    return Number((event.target as HTMLInputElement).value);
  }

  getAuthors(event: Event): void {
    // Данный функционал будет доработан, когда будет доработан компонент авторов.
    // const editedAuthors = (event.target as HTMLInputElement).value;
    // const authors: Users[] = [];
    // const newAuthor: Users = {} as Users;
    // editedAuthors.split(',').forEach((item) => {
    //   newAuthor.firstName = item;
    //   newAuthor.lastName = item;
    //   newAuthor.id = nanoid(5);
    //   authors.push(newAuthor);
    // });
    // return authors;
  }

  addNewCourse(): void {
    // this.coursesService.addItem(this.courseFields);
    this.coursesService.addItem(this.courseFields).pipe(take(1)).subscribe();
  }
}
