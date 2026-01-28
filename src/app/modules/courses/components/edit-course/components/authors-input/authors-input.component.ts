import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Authors } from 'src/app/domain/authors.interface';
import { AutoCompleteCompleteEvent } from 'src/app/domain/autocomplete.interface';
import { Courses } from 'src/app/domain/courses.interface';

@Component({
  selector: 'app-authors-edit-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsInputEditComponent {
  @Input() courseFields: Courses = {} as Courses;
  @Input() authors!: FormControl;
  @Input() filteredAuthors: Authors[] = [];
  @Output() getFilterAuthors: EventEmitter<AutoCompleteCompleteEvent> =
    new EventEmitter<AutoCompleteCompleteEvent>();

  getFilteredAuthors(event: AutoCompleteCompleteEvent): void {
    this.getFilterAuthors.emit(event);
  }
}
