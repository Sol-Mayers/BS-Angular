import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaintCourseItemDirective } from './paint-course-item.directive';
import { Component, Renderer2, ViewChild } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';

@Component({
  template: `<div [appPaintCourseItem]="course"></div>`,
})
class TestHostComponent {
  course?: Courses;
  @ViewChild(PaintCourseItemDirective) directive!: PaintCourseItemDirective;
}

describe('PaintCourseItemDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaintCourseItemDirective, TestHostComponent],
      providers: [
        {
          provide: Renderer2,
          useValue: jasmine.createSpyObj('Renderer2', ['setStyle']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    host.course = { creationDate: new Date() } as any;
    fixture.detectChanges();
    expect(host.directive).toBeTruthy();
  });
});
