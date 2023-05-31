import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { PaComponent } from './pa/pa.component';

const routes: Routes = [
  {
    path: '',
    title: 'Cá nhân',
    canActivate: [AuthGuard],
    component: PaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaRoutingModule {}
