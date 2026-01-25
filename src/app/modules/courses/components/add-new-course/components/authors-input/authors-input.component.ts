import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';

@Component({
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsInputComponent {
  @Input() courseFields: Courses = {} as Courses;

  authors: string =
    this.courseFields.authors
      ?.map((author) => [author.firstName ?? '', author.lastName ?? ''])
      .join() ?? '';

  getAuthors(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
