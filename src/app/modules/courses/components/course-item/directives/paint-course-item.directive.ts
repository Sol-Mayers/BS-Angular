import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';

@Directive({
  selector: '[appPaintCourseItem]',
})
export class PaintCourseItemDirective implements AfterViewInit, OnChanges {
  @Input('appPaintCourseItem') course?: Courses;
  private creationDate? = new Date();

  constructor(
    private readonly element: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      this.creationDate = this.course?.creationDate
        ? new Date(this.course!.creationDate)
        : undefined;
      this.applyBorder();
    }
  }

  public ngAfterViewInit(): void {
    this.applyBorder();
  }

  private applyBorder(): void {
    if (!this.creationDate) {
      return;
    }
    const el = this.element.nativeElement;
    const currentDate = new Date();

    const diffMs = currentDate.getTime() - this.creationDate.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    if (diffDays >= 0 && diffDays <= 14) {
      this.renderer.setStyle(el, 'border', '1px solid var(--green-300)');
    } else if (diffDays < 0) {
      this.renderer.setStyle(el, 'border', '1px solid var(--blue-300)');
    }
  }
}
