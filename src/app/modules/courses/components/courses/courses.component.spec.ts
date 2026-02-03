import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CoursesComponent } from './courses.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

describe('CoursesComponent', () => {
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
