import { Injectable } from '@angular/core';
import { Courses } from '../domain/courses.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly mainUrl = '/api';

  constructor(private readonly httpClient: HttpClient) {}

  public getList(params?: string): Observable<Courses[]> {
    if (params) {
      return this.httpClient
        .get<Courses[]>(`${this.mainUrl}/courses`)
        .pipe(
          map((courses) =>
            courses.filter(
              (course) =>
                course.title.toLowerCase().includes(params.toLowerCase()) ||
                course.description.toLowerCase().includes(params.toLowerCase())
            )
          )
        );
    } else {
      return this.httpClient.get<Courses[]>(`${this.mainUrl}/courses`);
    }
  }

  public createCourse(): void {
    console.log('course created');
  }

  public getItemById(): void {
    console.log('item id');
  }

  public updateItem(item: Courses): Observable<Courses[]> {
    return this.httpClient.put<Courses[]>(
      `${this.mainUrl}/courses/${item.id}`,
      item
    );
  }

  public removeItem(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.mainUrl}/courses/${id}`);
  }

  public addItem(course: Courses): Observable<Courses> {
    return this.httpClient.post<Courses>(`${this.mainUrl}/courses`, course);
  }
}
