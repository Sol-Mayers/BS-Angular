import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CoursesState } from 'src/app/store';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';

@Component({ selector: 'app-search', template: '' })
class FakeSearchComponent {}

@Component({ selector: 'app-courses', template: '' })
class FakeCoursesComponent {
  @Input() courses: Courses[] = [];
  @Input() isNotFound!: boolean;
  @Output() courseToEdit = new EventEmitter<Courses>();
  @Output() resetAll = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();
}

@Component({ selector: 'app-show-more-button', template: '' })
class FakeShowMoreComponent {}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let store: MockStore<CoursesState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        FakeSearchComponent,
        FakeCoursesComponent,
        FakeShowMoreComponent,
      ],
      providers: [
        ConfirmationService,
        MessageService,
        provideMockStore({ initialState: {} }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialized store', () => {
    expect(store).toBeTruthy();
  });
});
