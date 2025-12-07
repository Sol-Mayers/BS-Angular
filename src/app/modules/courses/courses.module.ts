import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CoursesComponent } from './components/courses/courses.component';
import { MainComponent } from './components/main/main.component';
import { SearchComponent } from './components/search/search.component';
import { DurationPipe } from './components/course-item/pipes/duration.pipe';
import { OrderByPipe } from './components/main/pipes/order-by.pipe';
import { FilterPipe } from './components/search/pipes/filter.pipe';
import { PaintCourseItemDirective } from './components/course-item/directives/paint-course-item.directive';
import { CoreModule } from '../core/core.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    CourseItemComponent,
    CoursesComponent,
    MainComponent,
    SearchComponent,
    DurationPipe,
    OrderByPipe,
    FilterPipe,
    PaintCourseItemDirective,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
  ],
  providers: [ConfirmationService],
  exports: [MainComponent],
})
export class CoursesModule {}
