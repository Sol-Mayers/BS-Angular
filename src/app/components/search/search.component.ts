import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  inputText = '';
  @Output() find: EventEmitter<string> = new EventEmitter<string>();

  getCourse(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  findCourse(): void {
    this.find.emit(this.inputText);
  }
}
