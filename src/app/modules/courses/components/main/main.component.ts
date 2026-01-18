import { Component, OnInit, ViewChild } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';
import { courses } from 'src/app/mock/courses';
import { FilterPipe } from '../search/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private readonly coursesService: CoursesService) {}

  @ViewChild('searchComponent') child!: SearchComponent;

  courses: Courses[] = [];
  courseToEdit: Courses = {} as Courses;
  filter = new FilterPipe();
  // // Имитация урлов для хлебных крошек!!!
  // routes: string[] = [];

  ngOnInit(): void {
    this.courses = this.coursesService.getList();
  }

  findCourse(text: string): void {
    this.courses = this.filter.transform(courses, 'title', text);
  }
  getCourseToEdit(item: Courses): void {
    this.courseToEdit = item;
  }
  resetFilters() {
    this.courses = this.filter.transform(courses, 'title', '');
    this.child.clearInput();
  }
}
