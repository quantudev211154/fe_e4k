import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RouteConstant } from 'src/app/core/constants';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: RouteConstant.ROUTE_HOME,
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: RouteConstant.ROUTE_WORDS,
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../words/words.module').then((m) => m.WordsModule),
      },
      {
        path: RouteConstant.ROUTE_USERS,
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule),
      },
      {
        path: `${RouteConstant.ROUTE_WORDS}/customize-word`,
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../add-word/add-word.module').then((m) => m.AddWordModule),
      },
      {
        path: 'course-detail/:courseId',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../course-detail/course-detail.module').then(
            (m) => m.CourseDetailModule
          ),
      },
      {
        path: 'lession-detail/:courseId/:lessionId',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../lession-detail/lession-detail.module').then(
            (m) => m.LessionDetailModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
