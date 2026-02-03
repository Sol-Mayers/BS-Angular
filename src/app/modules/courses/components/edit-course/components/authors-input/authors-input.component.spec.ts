import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsInputEditComponent } from './authors-input.component';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

describe('AuthorsInputEditComponent', () => {
  let component: AuthorsInputEditComponent;
  let fixture: ComponentFixture<AuthorsInputEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorsInputEditComponent],
      imports: [FormsModule, ReactiveFormsModule, AutoCompleteModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorsInputEditComponent);
    component = fixture.componentInstance;
    component.authors = new FormControl([], Validators.required);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
