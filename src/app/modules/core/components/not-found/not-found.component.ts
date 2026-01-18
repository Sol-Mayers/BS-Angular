import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  @Output() resetAll: EventEmitter<void> = new EventEmitter<void>();

  resetFilters() {
    this.resetAll.emit();
  }
}
