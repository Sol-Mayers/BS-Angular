import { Injectable } from '@angular/core';
import { CoursesService } from './courses.service';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../domain/courses.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly route: ActivatedRoute
  ) {}

  courses: Courses[] = [];
  private breadCrumbs = new BehaviorSubject<string[]>([]);

  emit(crumb: string) {
    this.breadCrumbs.next([crumb]);
  }

  onEvent(): Observable<string[]> {
    return this.breadCrumbs.asObservable();
  }

  getCurrentBreadcrumbs(): string[] {
    return this.breadCrumbs.value;
  }
}
