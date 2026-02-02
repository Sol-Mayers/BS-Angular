import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
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
import { Store } from '@ngrx/store';
import { nanoid } from 'nanoid';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Authors } from 'src/app/domain/authors.interface';
import { AutoCompleteCompleteEvent } from 'src/app/domain/autocomplete.interface';
import { CoursesState } from 'src/app/store';
import { selectAuthors } from 'src/app/store/authors/selectors/authors-selectors.selectors';
import { CoursesActions } from 'src/app/store/courses/actions/courses-actions.actions';
import { AuthorsActions } from 'src/app/store/authors/actions/authors-actions.actions';

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewCourseComponent implements OnInit, OnDestroy {
  constructor(
    private readonly fb: FormBuilder,
    public readonly router: Router,
    private readonly store: Store<CoursesState>
  ) {}
  @Input() routes: string[] = [];
  @Output() hideCoursePage: EventEmitter<boolean> = new EventEmitter<boolean>();

  route = 'Новый курс';
  addCourseForm!: FormGroup;
  allAuthors: Observable<Authors[]> = this.store.select(selectAuthors);
  filteredAuthors: Authors[] = [];
  private destroy$ = new Subject<void>();

  getFilteredAuthors(event: AutoCompleteCompleteEvent) {
    const filtered: Authors[] = [];
    const query = event.query;

    this.allAuthors.pipe(takeUntil(this.destroy$)).subscribe((authors) => {
      for (const author of authors) {
        if (author.name!.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          filtered.push(author);
        }
      }
    });

    this.filteredAuthors = filtered;
  }

  ngOnInit(): void {
    this.store.dispatch(AuthorsActions.getAuthors());

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
      this.store.dispatch(CoursesActions.createCourse({ data: formValue }));
      this.router.navigate(['/courses']);
    }
  }

  cancel(): void {
    this.router.navigate(['/courses']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
