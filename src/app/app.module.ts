import { NgModule } from '@angular/core';
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
  ],
  imports: [BrowserModule],
  exports: [CoursesComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
