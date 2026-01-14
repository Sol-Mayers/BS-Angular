import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';

@Component({
  selector: 'app-authors-edit-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsInputEditComponent {
  @Input() courseFields: Courses = {} as Courses;
  @Input() courseEditingFields: Courses = {} as Courses;

  getAuthors(event: Event): string {
    console.log(this.courseFields);
    this.courseFields.authors!.lastName = 'Фамилия';
    return (event.target as HTMLInputElement).value;
  }
}
