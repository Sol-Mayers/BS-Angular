import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './modules/core/components/not-found-page/not-found-page.component';
import { CoursesGuard } from './guards/courses.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses',
  },
  { path: '**', component: NotFoundPageComponent, canActivate: [CoursesGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
