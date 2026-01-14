import { Injectable } from '@angular/core';
import { Courses } from '../domain/courses.interface';
import { courses } from '../mock/courses';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses: Courses[] = [...courses];

  constructor() {}

  public getList(): Courses[] {
    return this.courses;
  }

  public createCourse(): void {
    console.log('course created');
  }

  public getItemById(): void {
    console.log('item id');
  }

  public updateItem(item: Courses): void {
    this.courses = this.courses.map((courseItem) => {
      if (courseItem.id == item.id) {
        return item;
      } else {
        return courseItem;
      }
    });
  }

  public removeItem(id: string): void {
    this.courses = this.courses.filter((item) => item.id !== id);
  }

  public addItem(course: Courses): void {
    this.courses.unshift(course);
  }
}
