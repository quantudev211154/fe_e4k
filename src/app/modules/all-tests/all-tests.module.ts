import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllTestsRoutingModule } from './all-tests-routing.module';
import { AllTestsComponent } from './all-tests/all-tests.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AllTestsComponent],
  imports: [CommonModule, AllTestsRoutingModule, SharedModule],
})
export class AllTestsModule {}
