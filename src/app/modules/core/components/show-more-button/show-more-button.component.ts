import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-show-more-button',
  templateUrl: './show-more-button.component.html',
  styleUrls: ['./show-more-button.component.css'],
})
export class ShowMoreButtonComponent {
  @Output() showMore: EventEmitter<number> = new EventEmitter<number>();
  private readonly countOfShowItems = 10;

  loadMore(): void {
    this.showMore.emit(this.countOfShowItems);
  }
}
