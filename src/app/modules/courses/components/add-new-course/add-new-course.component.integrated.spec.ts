import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AddNewCourseComponent } from './add-new-course.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Authors } from 'src/app/domain/authors.interface';
import { CoursesState } from 'src/app/store';
import { selectAuthors } from 'src/app/store/authors/selectors/authors-selectors.selectors';
import { AuthorsActions } from 'src/app/store/authors/actions/authors-actions.actions';
import { CoursesActions } from 'src/app/store/courses/actions/courses-actions.actions';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { By } from '@angular/platform-browser';

describe('AddNewCourseComponent (integrated unit test)', () => {
  let component: AddNewCourseComponent;
  let fixture: ComponentFixture<AddNewCourseComponent>;
  let store: MockStore<CoursesState>;
  let dispatchSpy: jasmine.Spy;

  const initialAuthors: Authors[] = [
    { id: 'a1', name: 'John Doe' },
    { id: 'a2', name: 'Jane Smith' },
  ];

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewCourseComponent, DurationPipe],
      imports: [ReactiveFormsModule, FormsModule, AutoCompleteModule],
      providers: [
        FormBuilder,
        provideMockStore({
          initialState: {
            courses: {} as any,
            authors: { entities: [], loaded: false } as any,
          } as any,
        }),
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore) as MockStore<CoursesState>;
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    store.overrideSelector(selectAuthors, initialAuthors);

    fixture = TestBed.createComponent(AddNewCourseComponent);
    component = fixture.componentInstance;
    component.routes = []; // стартовые данные маршрутов

    fixture.detectChanges();
  });

  it('should create and initialize form on ngOnInit, dispatch getAuthors', () => {
    expect(component).toBeTruthy();

    // Ожидаем, что из ngOnInit компонент инициирует загрузку авторов
    expect(dispatchSpy).toHaveBeenCalledWith(AuthorsActions.getAuthors());
    // Форма должна существовать и иметь поля
    expect(component.addCourseForm).toBeTruthy();
    const form = component.addCourseForm;
    expect(form.contains('title')).toBeTrue();
    expect(form.contains('description')).toBeTrue();
    expect(form.contains('duration')).toBeTrue();
    expect(form.contains('creationDate')).toBeTrue();
    expect(form.contains('authors')).toBeTrue();
  });

  it('should filter authors via getFilteredAuthors and populate filteredAuthors', () => {
    component.allAuthors = of(initialAuthors) as any;
    const event = { query: 'Jo' } as any;
    component.getFilteredAuthors(event);
    expect(component.filteredAuthors.length).toBe(1);
    expect(component.filteredAuthors[0].name).toBe('John Doe');
  });

  it('should dispatch createCourse and navigate on valid form submit', () => {
    component.addCourseForm.setValue({
      id: 'abcdef',
      title: 'Test Course',
      description: 'A description for testing',
      duration: '120',
      creationDate: '2024-01-01',
      authors: [initialAuthors[0]],
    });

    expect(component.addCourseForm.valid).toBeTrue();

    component.addNewCourse();

    expect(dispatchSpy).toHaveBeenCalledWith(
      CoursesActions.createCourse({ data: component.addCourseForm.value })
    );

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/courses']);
  });

  it('should navigate to courses on cancel', () => {
    component.cancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/courses']);
  });

  it('should call addNewCourse when save button is clicked and form is valid', () => {
    component.addCourseForm.setValue({
      id: 'abcdef',
      title: 'Test Course',
      description: 'A description for testing',
      duration: '120',
      creationDate: '2024-01-01',
      authors: [initialAuthors[0]],
    });

    expect(component.addCourseForm.valid).toBeTrue();

    const addNewCourseSpy = spyOn(component, 'addNewCourse').and.callThrough();

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

  afterEach(() => {
    fixture.destroy();
  });
});
