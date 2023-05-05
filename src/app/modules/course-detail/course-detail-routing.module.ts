import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CourseDetailComponent } from './course-detail/course-detail.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: CourseDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseDetailRoutingModule {}
