import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationInputComponent } from './duration-input.component';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { ReactiveFormsModule } from '@angular/forms';

describe('DurationInputComponent', () => {
  let component: DurationInputComponent;
  let fixture: ComponentFixture<DurationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DurationInputComponent, DurationPipe],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DurationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
