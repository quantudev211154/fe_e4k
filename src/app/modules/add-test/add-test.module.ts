import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTestRoutingModule } from './add-test-routing.module';
import { AddTestComponent } from './add-test/add-test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AddTestComponent],
  imports: [
    CommonModule,
    AddTestRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AddTestModule {}
