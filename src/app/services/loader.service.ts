import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}

  private showLoaderSubject = new BehaviorSubject<boolean>(false);
  public showLoader: Observable<boolean> =
    this.showLoaderSubject.asObservable();

  loaderIsOn() {
    this.showLoaderSubject.next(true);
  }

  loaderIsOff() {
    this.showLoaderSubject.next(false);
  }
}
