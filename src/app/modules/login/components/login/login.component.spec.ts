import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CoursesState } from 'src/app/store';
import { LoaderService } from 'src/app/services/loader.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore<CoursesState>;
  let loaderSpy: jasmine.SpyObj<LoaderService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LoaderService', [
      'loaderIsOn',
      'loaderIsOff',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastModule, FormsModule],
      declarations: [LoginComponent],
      providers: [
        provideMockStore({ initialState: {} }),
        { provide: LoaderService, useValue: spy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    loaderSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialized store', () => {
    expect(store).toBeTruthy();
  });

  it('should initialized loaderSpy', () => {
    expect(loaderSpy).toBeTruthy();
  });
});
