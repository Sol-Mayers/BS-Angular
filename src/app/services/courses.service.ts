import { Injectable } from '@angular/core';
import { Courses } from '../domain/courses.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly coursesUrl = '/api';
  // private courses: Courses[] = [...courses];

  constructor(private readonly httpClient: HttpClient) {}

  public getList(params?: Params): Observable<Courses[]> {
    return this.httpClient.get<Courses[]>(`${this.coursesUrl}/courses`, {
      params,
    });
  }

  public createCourse(): void {
    console.log('course created');
  }

  public getItemById(): void {
    console.log('item id');
  }

  public updateItem(item: Courses): void {
    // this.courses = this.courses.map((courseItem) => {
    //   if (courseItem.id == item.id) {
    //     return item;
    //   } else {
    //     return courseItem;
    //   }
    // });
    this.httpClient.put(`${this.coursesUrl}/courses/${item.id}`, item);
  }

  public removeItem(id: string): void {
    // this.courses = this.courses.filter((item) => item.id !== id);
    this.httpClient.delete(`${this.coursesUrl}/courses/${id}`);
  }

  public addItem(course: Courses): Observable<Courses> {
    // this.courses.unshift(course);
    return this.httpClient.post<Courses>(`${this.coursesUrl}/courses`, course);
  }
}
