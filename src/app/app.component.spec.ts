import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

@Component({ selector: 'app-loader', template: '' })
class FakeLoaderComponent {}

@Component({ selector: 'app-header', template: '' })
class FakeHeaderComponent {}

@Component({ selector: 'app-footer', template: '' })
class FakeFooterComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FakeLoaderComponent,
        FakeHeaderComponent,
        FakeFooterComponent,
      ],
      providers: [
        { provide: LoaderService, useValue: { showLoader: of(false) } },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
