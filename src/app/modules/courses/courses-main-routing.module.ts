import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AddNewCourseComponent } from './components/add-new-course/add-new-course.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { CoursesMainComponent } from './courses-main.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/courses' },
  {
    path: '',
    component: CoursesMainComponent,
    children: [
      // { path: '', redirectTo: 'add-course', pathMatch: 'full' },
      { path: 'courses', component: MainComponent },
      { path: 'courses/new', component: AddNewCourseComponent },
      { path: 'courses/:id', component: EditCourseComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesMainRoutingModule {}
