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

  getAuthors(event: Event): string {
    this.courseFields.authors!.lastName = 'Фамилия';
    return (event.target as HTMLInputElement).value;
  }
}
