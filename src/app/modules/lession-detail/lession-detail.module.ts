import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessionDetailRoutingModule } from './lession-detail-routing.module';
import { LessionDetailComponent } from './lession-detail/lession-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllRoundsComponent } from './all-rounds/all-rounds.component';
import { AddRoundComponent } from './add-round/add-round.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LessionDetailComponent, AllRoundsComponent, AddRoundComponent],
  imports: [
    CommonModule,
    LessionDetailRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class LessionDetailModule {}
