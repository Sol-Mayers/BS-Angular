import { Component } from '@angular/core';
import { MainComponent } from '../main/main.component';
import { FilterPipe } from './pipes/filter.pipe';
import { Courses } from 'src/app/domain/courses.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent extends MainComponent {
  inputText = '';
  filter = new FilterPipe();

  getCourse(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  findCourse(): void {
    this.filteredCourses = this.filter.transform(
      this.courses,
      'title',
      this.inputText
    );

    console.log('filtered:', this.filteredCourses);
  }
}
