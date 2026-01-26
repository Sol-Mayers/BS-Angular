import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private readonly loaderService: LoaderService) {
    this.showLoader$ = this.loaderService.showLoader;
  }

  showLoader$: Observable<boolean>;
}
