import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';

@Component({
  selector: 'app-authors-edit-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsInputEditComponent implements OnInit {
  @Input() courseFields: Courses = {} as Courses;
  authors = '';

  ngOnInit(): void {
    this.authors =
      this.courseFields.authors
        ?.map(
          (author) =>
            (author.firstName ? author.firstName : '') +
            ' ' +
            (author.lastName ? author.lastName : '')
        )
        .join(', ') ?? '';
  }
  getAuthors(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
