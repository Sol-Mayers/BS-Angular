import { Component, OnInit, ViewChild } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';
import { FilterPipe } from '../search/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses.service';
import { SearchComponent } from '../search/search.component';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private readonly coursesService: CoursesService) {}

  @ViewChild('searchComponent') child!: SearchComponent;

  courses: Observable<Courses[]> | null = null;
  courseToEdit: Courses = {} as Courses;
  filter = new FilterPipe();
  // // Имитация урлов для хлебных крошек!!!
  // routes: string[] = [];

  ngOnInit(): void {
    this.courses = this.coursesService.getList();
  }

  findCourse(text: string): void {
    // this.courses = this.filter.transform(courses, 'title', text);
    const params = new HttpParams().set('title', text).set('description', text);
    this.courses = this.coursesService.getList({ params });
  }
  getCourseToEdit(item: Courses): void {
    this.courseToEdit = item;
  }
  resetFilters() {
    this.courses = this.coursesService.getList();
    this.child.clearInput();
  }
  deleteCourse(id: string): void {
    this.coursesService.removeItem(id);
    this.courses = this.coursesService.getList();
  }
}
