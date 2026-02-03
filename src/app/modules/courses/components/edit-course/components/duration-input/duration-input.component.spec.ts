import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DurationInputEditComponent } from './duration-input.component';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('DurationInputComponent', () => {
  let component: DurationInputEditComponent;
  let fixture: ComponentFixture<DurationInputEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DurationInputEditComponent, DurationPipe],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DurationInputEditComponent);
    component = fixture.componentInstance;
    component.duration = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
