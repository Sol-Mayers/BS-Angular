import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { Authors } from 'src/app/domain/authors.interface';
import { AutoCompleteCompleteEvent } from 'src/app/domain/autocomplete.interface';
import { Courses } from 'src/app/domain/courses.interface';
import { AuthorsService } from 'src/app/services/authors.service';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class EditCourseComponent implements OnInit {
  constructor(
    private readonly coursesService: CoursesService,
    private currentRoute: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbsService,
    private readonly fb: FormBuilder,
    private readonly authorsService: AuthorsService,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe,
    public readonly router: Router
  ) {}

  courses: Observable<Courses[]> = this.coursesService.getList();
  @Output() hideCoursePage: EventEmitter<boolean> = new EventEmitter<boolean>();

  editCourseForm!: FormGroup;
  allAuthors: Authors[] = [];
  filteredAuthors: Authors[] = [];
  currentId: string | null = null;
  // Поля текущего курса
  courseFields!: Observable<Courses | null>;

  getFilteredAuthors(event: AutoCompleteCompleteEvent) {
    const filtered: Authors[] = [];
    const query = event.query;

    for (const author of this.allAuthors) {
      if (author.name!.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(author);
      }
    }

    this.filteredAuthors = filtered;
    console.log(this.filteredAuthors);
  }

  ngOnInit(): void {
    this.authorsService.getAuthors().subscribe({
      next: (authors) => {
        if (Array.isArray(authors)) {
          this.allAuthors = authors;
        } else {
          this.allAuthors = [];
        }
      },
    });
    this.editCourseForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      duration: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      creationDate: ['', [Validators.required]],
      authors: this.fb.control<Authors[]>([], Validators.required),
    });

    const idParam = this.currentRoute.snapshot.paramMap.get('id');
    this.currentId = idParam ?? null;

    this.courseFields = this.courses.pipe(
      map(
        (list) =>
          list?.find((c) => {
            return c.id == this.currentId;
          }) ?? null
      ),
      tap((course) => {
        if (course) {
          this.breadcrumbService.emit(course.title);
          this.cd.markForCheck();
        }
      })
    );

    this.courseFields.pipe(take(1)).subscribe((course) => {
      if (course) {
        this.editCourseForm.patchValue({
          id: course.id,
          title: course.title,
          description: course.description,
          duration: course.duration,
          creationDate: this.datePipe.transform(
            course.creationDate,
            'yyyy-MM-dd'
          ),
          authors: Array.isArray(course.authors) ? course.authors : [],
        });
        this.cd.markForCheck();
      }
    });
  }

  get authors() {
    return this.editCourseForm.get('authors') as FormControl;
  }
  get title() {
    return this.editCourseForm.get('title');
  }
  get description() {
    return this.editCourseForm.get('description');
  }
  get creationDate() {
    return this.editCourseForm.get('creationDate');
  }
  get duration() {
    return this.editCourseForm.get('duration') as FormControl;
  }

  editCourse(): void {
    if (this.editCourseForm) {
      const formValue = this.editCourseForm.value;
      this.coursesService.updateItem(formValue).pipe(take(1)).subscribe();
      this.router.navigate(['/courses']);
    }
  }

  cancel(): void {
    this.router.navigate(['/courses']);
  }
}
