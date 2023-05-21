import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTestComponent } from './add-test/add-test.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    title: 'Tạo đề',
    component: AddTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTestRoutingModule {}
