import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseComponent } from './edit-course.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoaderService } from 'src/app/services/loader.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CoursesState } from 'src/app/store';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Authors } from 'src/app/domain/authors.interface';
import { AutoCompleteCompleteEvent } from 'src/app/domain/autocomplete.interface';

@Component({ selector: 'app-duration-edit-input', template: '' })
class FakeDurationEditComponent {
  @Input() duration!: FormControl;
}

@Component({ selector: 'app-authors-edit-input', template: '' })
class FakeAuthorsEditComponent {
  @Input() authors!: FormControl;
  @Input() filteredAuthors: Authors[] = [];
  @Output() getFilterAuthors: EventEmitter<AutoCompleteCompleteEvent> =
    new EventEmitter<AutoCompleteCompleteEvent>();
}

describe('EditCourseComponent', () => {
  let component: EditCourseComponent;
  let fixture: ComponentFixture<EditCourseComponent>;
  let loaderSpy: jasmine.SpyObj<LoaderService>;
  let store: MockStore<CoursesState>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LoaderService', [
      'loaderIsOn',
      'loaderIsOff',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [
        EditCourseComponent,
        FakeDurationEditComponent,
        FakeAuthorsEditComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: { paramMap: { get: (key: string) => null } },
          },
        },
        { provide: LoaderService, useValue: spy },
        provideMockStore({ initialState: {} }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCourseComponent);
    component = fixture.componentInstance;
    loaderSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have loader spy defined', () => {
    expect(loaderSpy).toBeTruthy();
  });

  it('should initialized store', () => {
    expect(store).toBeTruthy();
  });
});
