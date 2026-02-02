import { Injectable } from '@angular/core';
import { Courses, CoursesQueryParams } from '../domain/courses.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly mainUrl = '/api';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly loaderService: LoaderService
  ) {}

  public getList(props?: CoursesQueryParams): Observable<Courses[]> {
    setTimeout(() => this.loaderService.loaderIsOn(), 0);
    const { filter, params } = props ?? {};

    if (filter) {
      return this.httpClient
        .get<Courses[]>(`${this.mainUrl}/courses`, {
          params: params,
        })
        .pipe(
          map((courses) =>
            courses.filter((course) => {
              return (
                course.title.toLowerCase().includes(filter.toLowerCase()) ||
                course.description.toLowerCase().includes(filter.toLowerCase())
              );
            })
          ),
          catchError((err) => {
            console.error(err);
            return throwError(
              () => new Error(`Ошибка загрузки курсов: ${err}`)
            );
          }),
          finalize(() => {
            this.loaderService.loaderIsOff();
          })
        );
    } else if (params) {
      return this.httpClient
        .get<Courses[]>(`${this.mainUrl}/courses`, {
          params: params,
        })
        .pipe(
          catchError((err) => {
            console.error(err);
            return throwError(
              () => new Error(`Ошибка загрузки курсов: ${err}`)
            );
          }),
          finalize(() => {
            this.loaderService.loaderIsOff();
          })
        );
    } else {
      return this.httpClient.get<Courses[]>(`${this.mainUrl}/courses`).pipe(
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error(`Ошибка загрузки курсов: ${err}`));
        }),
        finalize(() => {
          this.loaderService.loaderIsOff();
        })
      );
    }
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
