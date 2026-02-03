import { TestBed } from '@angular/core/testing';

import { CoursesGuard } from './courses.guard';
import { LoaderService } from '../services/loader.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CoursesGuard', () => {
  let guard: CoursesGuard;
  let loaderSpy: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoaderService', [
      'loaderIsOn',
      'loaderIsOff',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: LoaderService, useValue: spy }],
    });

    loaderSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    guard = TestBed.inject(CoursesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should have loader spy defined', () => {
    expect(loaderSpy).toBeTruthy();
  });
});
