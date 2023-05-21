import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTestsComponent } from './all-tests/all-tests.component';

const routes: Routes = [
  {
    path: '',
    title: 'Ngân hàng đề',
    component: AllTestsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllTestsRoutingModule {}
