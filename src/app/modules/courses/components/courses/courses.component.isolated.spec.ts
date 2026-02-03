import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { Courses } from 'src/app/domain/courses.interface';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('CoursesComponent (isolated tests)', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [ConfirmDialogModule, ToastModule],
      providers: [ConfirmationService, MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit course on courseToEdit via getCourseToEdit', () => {
    const mockCourse: any = { id: 'c1', title: 'Test Course' } as Courses;
    let emitted: Courses | undefined;
    component.courseToEdit.subscribe((c: Courses) => (emitted = c));

    component.getCourseToEdit(mockCourse);

    expect(emitted).toBeDefined();
    expect(emitted).toBe(mockCourse);
  });

  it('should emit edit true and emit course on editCourse', () => {
    const mockCourse: any = { id: 'c2', title: 'Another' } as Courses;

    let editValue: boolean | undefined;
    let emittedCourse: Courses | undefined;

    component.edit.subscribe((val: boolean) => (editValue = val));
    component.courseToEdit.subscribe((c: Courses) => (emittedCourse = c));

    component.editCourse(mockCourse);

    expect(editValue).toBeTrue?.();

    expect(editValue).toBe(true);
    expect(emittedCourse).toBe(mockCourse);
  });

  it('should emit id on showDeleteConfirm', () => {
    const id = 'del-123';
    let emittedId: string | undefined;
    component.delete.subscribe((i: string) => (emittedId = i));

    component.showDeleteConfirm(id);

    expect(emittedId).toBe(id);
  });

  it('should emit on resetAll when resetFilters is called', () => {
    let resetEmitted = false;
    component.resetAll.subscribe(() => (resetEmitted = true));

    component.resetFilters();

    expect(resetEmitted).toBeTrue();
  });

  it('should have default empty courses array when not provided', () => {
    expect(component.courses).toEqual([]);
  });
});
