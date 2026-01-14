import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationInputEditComponent } from './duration-input.component';

describe('DurationInputComponent', () => {
  let component: DurationInputEditComponent;
  let fixture: ComponentFixture<DurationInputEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DurationInputEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DurationInputEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
