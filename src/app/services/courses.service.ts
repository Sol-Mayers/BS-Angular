import { Injectable } from '@angular/core';
import { Courses, CoursesQueryParams } from '../domain/courses.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly mainUrl = '/api';

  constructor(private readonly httpClient: HttpClient) {}

  public getList(props?: CoursesQueryParams): Observable<Courses[]> {
    const { filter, params } = props ?? {};

    if (filter) {
      return this.httpClient
        .get<Courses[]>(`${this.mainUrl}/courses`, {
          params: params,
        })
        .pipe(
          map((courses) =>
            courses.filter(
              (course) =>
                course.title.toLowerCase().includes(filter.toLowerCase()) ||
                course.description.toLowerCase().includes(filter.toLowerCase())
            )
          )
        );
    } else if (params) {
      return this.httpClient.get<Courses[]>(`${this.mainUrl}/courses`, {
        params: params,
      });
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
