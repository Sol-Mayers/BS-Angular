import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { MainComponent } from './components/main/main.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SearchComponent } from './components/search/search.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ShowMoreButtonComponent } from './components/show-more-button/show-more-button.component';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { DurationPipe } from './components/course-item/pipes/duration.pipe';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { OrderByPipe } from './components/main/pipes/order-by.pipe';
import { FilterPipe } from './components/search/pipes/filter.pipe';
import { PaintCourseItemDirective } from './components/course-item/directives/paint-course-item.directive';
import { NotFoundComponent } from './components/not-found/not-found.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    MainComponent,
    BreadcrumbsComponent,
    SearchComponent,
    CoursesComponent,
    ShowMoreButtonComponent,
    CourseItemComponent,
    DurationPipe,
    OrderByPipe,
    FilterPipe,
    PaintCourseItemDirective,
    NotFoundComponent,
  ],
  imports: [BrowserModule],
  exports: [CoursesComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'ru-RU' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
