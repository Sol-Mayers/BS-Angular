import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid';
import { take } from 'rxjs';
import { Authors } from 'src/app/domain/authors.interface';
import { AutoCompleteCompleteEvent } from 'src/app/domain/autocomplete.interface';
import { AuthorsService } from 'src/app/services/authors.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewCourseComponent implements OnInit {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly fb: FormBuilder,
    private readonly authorsService: AuthorsService,
    public readonly router: Router
  ) {}
  @Input() routes: string[] = [];
  @Output() hideCoursePage: EventEmitter<boolean> = new EventEmitter<boolean>();

  route = 'Новый курс';
  addCourseForm!: FormGroup;
  allAuthors: Authors[] = [];
  filteredAuthors: Authors[] = [];

  getFilteredAuthors(event: AutoCompleteCompleteEvent) {
    const filtered: Authors[] = [];
    const query = event.query;

    for (const author of this.allAuthors) {
      if (author.name!.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(author);
      }
    }

    this.filteredAuthors = filtered;
  }

  ngOnInit(): void {
    this.authorsService.getAuthors().subscribe({
      next: (authors) => {
        this.allAuthors = authors;
      },
    });
    this.routes.push(this.route);

    this.addCourseForm = this.fb.group({
      id: [nanoid(5)],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      duration: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      creationDate: ['', [Validators.required]],
      authors: this.fb.control<Authors | null>(null, Validators.required),
    });
  }

  get authors() {
    return this.addCourseForm.get('authors') as FormControl;
  }
  get title() {
    return this.addCourseForm.get('title');
  }
  get description() {
    return this.addCourseForm.get('description');
  }
  get creationDate() {
    return this.addCourseForm.get('creationDate');
  }
  get duration() {
    return this.addCourseForm.get('duration');
  }

  addNewCourse(): void {
    if (this.addCourseForm.valid) {
      const formValue = this.addCourseForm.value;
      this.coursesService.addItem(formValue).pipe(take(1)).subscribe();
      this.router.navigate(['/courses']);
    }
  }

  cancel(): void {
    this.router.navigate(['/courses']);
  }
}
