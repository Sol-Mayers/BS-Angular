import { HttpParams } from '@angular/common/http';
import { Users } from './users.interface';
import { Authors } from './authors.interface';

export interface Courses {
  id: string;
  title: string;
  creationDate: Date | string | null;
  duration: number | null;
  description: string;
  topRated?: boolean;
  authors?: Authors[];
  //временно поставлена опциональность
}
export interface CoursesQueryParams {
  filter?: string;
  params?: {
    _limit: string;
    _sort?: keyof Courses;
    _order?: 'asc' | 'desc';
  };
}
