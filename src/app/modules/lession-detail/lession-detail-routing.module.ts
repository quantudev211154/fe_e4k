import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessionDetailComponent } from './lession-detail/lession-detail.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AllRoundsComponent } from './all-rounds/all-rounds.component';
import { AddRoundComponent } from './add-round/add-round.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LessionDetailComponent,
    children: [
      {
        path: '',
        title: 'Chi tiết chương',
        component: AllRoundsComponent,
      },
      {
        path: 'add-round',
        title: 'Thêm màn chơi',
        component: AddRoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessionDetailRoutingModule {}
