import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemComponent } from './course-item.component';
import { ConfirmationService } from 'primeng/api';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { Directive, Input } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';
import { RouterTestingModule } from '@angular/router/testing';

@Directive({ selector: '[appPaintCourseItem]' })
export class PaintCourseItemDirective {
  @Input('appPaintCourseItem') course?: Courses;
}

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        CourseItemComponent,
        DurationPipe,
        PaintCourseItemDirective,
      ],
      providers: [ConfirmationService],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
