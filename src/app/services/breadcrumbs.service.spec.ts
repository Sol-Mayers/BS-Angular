import { TestBed } from '@angular/core/testing';

import { BreadcrumbsService } from './breadcrumbs.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { LoaderService } from './loader.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BreadcrumbsService', () => {
  let service: BreadcrumbsService;
  let loaderSpy: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LoaderService', [
      'loaderIsOn',
      'loaderIsOff',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState: {} }),
        { provide: LoaderService, useValue: spy },
        { provide: ActivatedRoute, useValue: { params: of({}) } },
      ],
    });

    service = TestBed.inject(BreadcrumbsService);
    loaderSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialized loaderSpy', () => {
    expect(loaderSpy).toBeTruthy();
  });
});
