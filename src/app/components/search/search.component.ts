import { Component } from '@angular/core';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent extends MainComponent {
  inputText = '';

  getCourse(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  findCourse(): void {
    console.log(this.inputText);
  }
}
