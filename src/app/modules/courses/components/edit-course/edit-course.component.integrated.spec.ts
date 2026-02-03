import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { EditCourseComponent } from './edit-course.component';
import { CoursesState } from 'src/app/store';
import { CoursesActions } from 'src/app/store/courses/actions/courses-actions.actions';
import { selectAuthors } from 'src/app/store/authors/selectors/authors-selectors.selectors';
import { selectCourses } from 'src/app/store/courses/selectors/courses-selectors.selectors';
import { Authors } from 'src/app/domain/authors.interface';
import { Courses } from 'src/app/domain/courses.interface';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoaderService } from 'src/app/services/loader.service';
import { By } from '@angular/platform-browser';

describe('EditCourseComponent', () => {
  let component: EditCourseComponent;
  let fixture: ComponentFixture<EditCourseComponent>;
  let store: MockStore<CoursesState>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activatedRouteStub: any;
  let loaderSpy: jasmine.SpyObj<LoaderService>;

  const initialAuthors: Authors[] = [
    { id: 'a1', name: 'Авы ваппав' },
    { id: 'a2', name: 'Пвыа ывп' },
  ];

  const initialCourses: Courses[] = [
    {
      id: '1',
      title: 'Existing Course',
      description: 'Desc',
      duration: 42,
      creationDate: new Date('2020-01-01'),
      authors: [initialAuthors[0]],
    },
  ];

  beforeEach(async () => {
    activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: (key: string) => (key === 'id' ? '1' : null),
        },
      },
    };

    const spy = jasmine.createSpyObj('LoaderService', [
      'loaderIsOn',
      'loaderIsOff',
    ]);

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [EditCourseComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        DatePipe,
        provideMockStore({
          initialState: {
            courses: initialCourses,
            authors: initialAuthors,
          } as any,
        }),
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy },
        { provide: LoaderService, useValue: spy },
      ],

      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore) as MockStore<CoursesState>;
    loaderSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseComponent);
    component = fixture.componentInstance;

    store.overrideSelector(selectAuthors, initialAuthors);
    store.overrideSelector(selectCourses, initialCourses);
    fixture.detectChanges();
  });

  it('should have loader spy defined', () => {
    expect(loaderSpy).toBeTruthy();
  });

  it('should create and initialize the form on init', () => {
    expect(component).toBeTruthy();
    expect(component.editCourseForm).toBeDefined();

    const titleCtrl = component.editCourseForm.get('title');
    expect(titleCtrl).toBeTruthy();
  });

  it('should populate form values when route id matches an existing course', () => {
    fixture.detectChanges();

    const form = component.editCourseForm;
    expect(form.get('id')?.value).toBe('1');
    expect(form.get('title')?.value).toBe('Existing Course');
    expect(form.get('description')?.value).toBe('Desc');
    expect(form.get('duration')?.value).toBe(42);
    expect(form.get('creationDate')?.value).toBeTruthy();
  });

  it('should dispatch updateCourse and navigate on editCourse', () => {
    fixture.detectChanges();
    const form = component.editCourseForm;

    form.setValue({
      id: '1',
      title: 'Updated Title',
      description: 'Updated Description',
      duration: 60,
      creationDate: '2020-01-02',
      authors: initialAuthors,
    });

    expect(form.valid).toBeTrue();

    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    component.editCourse();

    expect(dispatchSpy).toHaveBeenCalledWith(
      CoursesActions.updateCourse({ data: form.value })
    );

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/courses']);
  });

  it('should call EditCourse when save button is clicked and form is valid', () => {
    component.editCourseForm.setValue({
      id: 'abcdef',
      title: 'Test Course',
      description: 'A description for testing',
      duration: '120',
      creationDate: '2024-01-01',
      authors: [initialAuthors[0]],
    });

    expect(component.editCourseForm.valid).toBeTrue();

    const addNewCourseSpy = spyOn(component, 'editCourse').and.callThrough();

    const formDE = fixture.debugElement.query(By.css('form'));
    formDE.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    expect(addNewCourseSpy).toHaveBeenCalled();
  });

  it('should call cancel when cancel button is clicked', () => {
    const cancelSpy = spyOn(component, 'cancel').and.callThrough();

    const cancelBtn = fixture.debugElement
      .queryAll(By.css('button'))
      .find((btn) => btn.nativeElement.getAttribute('type') !== 'submit');

    expect(cancelBtn).toBeTruthy();

    cancelBtn!.nativeElement.click();
    fixture.detectChanges();

    expect(cancelSpy).toHaveBeenCalled();
  });
});
