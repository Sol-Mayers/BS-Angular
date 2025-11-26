import { Pipe, PipeTransform } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform<T extends keyof Courses>(
    list: Courses[],
    orderField: T
  ): Courses[] {
    return list.sort((a, b) => {
      const av = a[orderField];
      const bv = b[orderField];

      if (typeof av === 'number' && typeof bv === 'number') {
        return (bv as unknown as number) - (av as unknown as number);
      } else if (typeof av === 'string' && typeof bv === 'string') {
        return av.localeCompare(bv);
      } else {
        return JSON.stringify(bv).localeCompare(JSON.stringify(av));
      }
    });
  }
}
