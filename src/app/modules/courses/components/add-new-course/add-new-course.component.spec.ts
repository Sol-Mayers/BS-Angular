import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AddNewCourseComponent } from './add-new-course.component';
import { CoursesState } from 'src/app/store';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { of } from 'rxjs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

describe('AddNewCourseComponent', () => {
  let component: AddNewCourseComponent;
  let fixture: ComponentFixture<AddNewCourseComponent>;
  let store: MockStore<CoursesState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewCourseComponent, DurationPipe],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        AutoCompleteModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
      ],
      providers: [provideMockStore({ initialState: {} })],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewCourseComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store defined', () => {
    expect(store).toBeTruthy();
  });
});
