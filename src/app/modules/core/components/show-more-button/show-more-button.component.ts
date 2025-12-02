import { Component } from '@angular/core';

@Component({
  selector: 'app-show-more-button',
  templateUrl: './show-more-button.component.html',
  styleUrls: ['./show-more-button.component.css'],
})
export class ShowMoreButtonComponent {
  loadMore(): void {
    console.log('load more');
  }
}
