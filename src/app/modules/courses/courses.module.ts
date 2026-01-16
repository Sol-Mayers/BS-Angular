import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CoursesComponent } from './components/courses/courses.component';
import { MainComponent } from './components/main/main.component';
import { SearchComponent } from './components/search/search.component';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { OrderByPipe } from './components/main/pipes/order-by.pipe';
import { FilterPipe } from './components/search/pipes/filter.pipe';
import { PaintCourseItemDirective } from './components/course-item/directives/paint-course-item.directive';
import { CoreModule } from '../core/core.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { AddCourseButtonComponent } from './components/add-course-button/add-course-button.component';
import { AddNewCourseComponent } from './components/add-new-course/add-new-course.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DurationInputComponent } from './components/add-new-course/components/duration-input/duration-input.component';
import { AuthorsInputComponent } from './components/add-new-course/components/authors-input/authors-input.component';
import { DurationInputEditComponent } from './components/edit-course/components/duration-input/duration-input.component';
import { AuthorsInputEditComponent } from './components/edit-course/components/authors-input/authors-input.component';
import { CalendarModule } from 'primeng/calendar';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { FormsModule } from '@angular/forms';
import { CoursesMainRoutingModule } from './courses-main-routing.module';
import { BreadcrumbsComponent } from '../core/components/breadcrumbs/breadcrumbs.component';
import { CoursesMainComponent } from './courses-main.component';

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
    AddCourseButtonComponent,
    AddNewCourseComponent,
    DurationInputComponent,
    DurationInputEditComponent,
    AuthorsInputEditComponent,
    AuthorsInputComponent,
    EditCourseComponent,
    CoursesMainComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    FormsModule,
    CoursesMainRoutingModule,
  ],
  providers: [ConfirmationService, MessageService],
  exports: [MainComponent],
})
export class CoursesModule {}
