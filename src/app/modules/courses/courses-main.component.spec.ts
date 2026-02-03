import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesMainComponent } from './courses-main.component';
import { LoaderService } from 'src/app/services/loader.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Component({ selector: 'app-breadcrumbs', template: '' })
class FakeBreadCrumbsComponent {
  @Input() breadcrumbs?: string[];
}

describe('CoursesMainComponent', () => {
  let component: CoursesMainComponent;
  let fixture: ComponentFixture<CoursesMainComponent>;
  let loaderSpy: jasmine.SpyObj<LoaderService>;
  let breadcrumbsSpy: jasmine.SpyObj<BreadcrumbsService>;

  beforeEach(async () => {
    breadcrumbsSpy = jasmine.createSpyObj('BreadcrumbsService', [
      'getCurrentBreadcrumbs',
      'onEvent',
    ]);

    breadcrumbsSpy.getCurrentBreadcrumbs.and.returnValue([]);

    breadcrumbsSpy.onEvent.and.returnValue(of([]));

    const spy = jasmine.createSpyObj('LoaderService', [
      'loaderIsOn',
      'loaderIsOff',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [CoursesMainComponent, FakeBreadCrumbsComponent],
      providers: [
        { provide: LoaderService, useValue: spy },
        { provide: BreadcrumbsService, useValue: breadcrumbsSpy },
        { provide: ActivatedRoute, useValue: { params: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesMainComponent);
    component = fixture.componentInstance;
    loaderSpy = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have loader spy defined', () => {
    expect(loaderSpy).toBeTruthy();
  });
});
