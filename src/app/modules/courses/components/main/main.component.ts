import { Component, OnInit } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';
import { courses } from 'src/app/mock/courses';
import { FilterPipe } from '../search/pipes/filter.pipe';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private readonly coursesService: CoursesService) {}

  courses: Courses[] = [];
  filter = new FilterPipe();

  ngOnInit(): void {
    this.courses = this.coursesService.getList();
  }

  findCourse(text: string): void {
    this.courses = this.filter.transform(courses, 'title', text);
  }
}
