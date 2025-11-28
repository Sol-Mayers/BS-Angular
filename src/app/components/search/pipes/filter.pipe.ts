import { Pipe, PipeTransform } from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(list: Courses[], field: keyof Courses, search: string): Courses[] {
    if (!list) {
      return [];
    }
    if (!search) {
      return list;
    }
    const upper = search.toUpperCase();

    return list.filter((item) =>
      String(item[field]).toUpperCase().includes(upper)
    );
  }
}
