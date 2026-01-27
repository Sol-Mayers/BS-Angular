import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authors } from '../domain/authors.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private readonly mainUrl = '/api';

  constructor(private readonly httpClient: HttpClient) {}

  public getAuthors(): Observable<Authors[]> {
    return this.httpClient.get<Authors[]>(`${this.mainUrl}/authors`);
  }
}
