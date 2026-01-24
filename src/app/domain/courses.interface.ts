import { HttpParams } from '@angular/common/http';
import { Users } from './users.interface';

export interface Courses {
  id: string;
  title: string;
  creationDate: Date | string | null;
  duration: number | null;
  description: string;
  topRated?: boolean;
  authors?: Users[];
  //временно поставлена опциональность
}
export interface CoursesQueryParams {
  filter?: string;
  params?: {
    _limit: string;
  };
}
