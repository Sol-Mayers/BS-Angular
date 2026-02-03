import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { LoaderService } from './loader.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CoursesService', () => {
  let service: CoursesService;
  let loaderSpy: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoaderService', [
      'loaderIsOn',
      'loaderIsOff',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService, { provide: LoaderService, useValue: spy }],
    });
    service = TestBed.inject(CoursesService);
    loaderSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have loader spy defined', () => {
    expect(loaderSpy).toBeTruthy();
  });
});
