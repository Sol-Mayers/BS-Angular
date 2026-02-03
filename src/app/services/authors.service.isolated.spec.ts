import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthorsService } from './authors.service';
import { Authors } from '../domain/authors.interface';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let httpMock: HttpTestingController;
  const baseUrl = '/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorsService],
    });

    service = TestBed.inject(AuthorsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch authors with GET to /api/authors and return data', () => {
    const mockAuthors: Authors[] = [
      { id: '1', name: 'Author One' },
      { id: '2', name: 'Author Two' },
    ];

    service.getAuthors().subscribe((authors) => {
      expect(authors).toEqual(mockAuthors);
    });

    const req = httpMock.expectOne(`${baseUrl}/authors`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAuthors);
  });
});
