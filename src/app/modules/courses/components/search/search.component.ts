import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  inputText = '';
  text = new Subject<string>();
  @Output() find: EventEmitter<string> = new EventEmitter<string>();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.text
      .pipe(debounceTime(250), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((text) => {
        const clearedSpaceText = text.replaceAll(' ', '');

        if (clearedSpaceText.length >= 3 || clearedSpaceText.length === 0) {
          this.find.emit(text);
        }
      });
  }

  getCourse(event: Event): void {
    this.text.next((event.target as HTMLInputElement).value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
