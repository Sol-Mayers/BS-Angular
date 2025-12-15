import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { Courses } from 'src/app/domain/courses.interface';

@Directive({
  selector: '[appPaintCourseItem]',
})
export class PaintCourseItemDirective implements AfterViewInit {
  @Input('appPaintCourseItem') course?: Courses;

  constructor(
    private readonly element: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  public ngAfterViewInit(): void {
    const currentDate = new Date();
    const creationDate = this.course!.creationDate;
    const el = this.element.nativeElement;

    if (
      creationDate! < currentDate &&
      (creationDate as Date)?.getDate() >= currentDate.getDate() - 14
    ) {
      this.renderer.setStyle(el, 'border', '1px solid var(--green-300)');
    } else if (creationDate! > currentDate) {
      this.renderer.setStyle(el, 'border', '1px solid var(--blue-300)');
    }
  }
}
