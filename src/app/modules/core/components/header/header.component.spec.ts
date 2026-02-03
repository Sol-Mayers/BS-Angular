import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CoursesState } from 'src/app/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoaderService } from 'src/app/services/loader.service';
import { Component } from '@angular/core';

@Component({ selector: 'app-logo', template: '' })
class FakeLogoComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let loaderSpy: jasmine.SpyObj<LoaderService>;
  let store: MockStore<CoursesState>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LoaderService', [
      'loaderIsOn',
      'loaderIsOff',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HeaderComponent, FakeLogoComponent],
      providers: [
        provideMockStore({ initialState: {} }),
        { provide: LoaderService, useValue: spy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    loaderSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store defined', () => {
    expect(store).toBeTruthy();
  });

  it('should have loader spy defined', () => {
    expect(loaderSpy).toBeTruthy();
  });
});
