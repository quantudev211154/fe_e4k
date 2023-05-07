import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessionDetailRoutingModule } from './lession-detail-routing.module';
import { LessionDetailComponent } from './lession-detail/lession-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllRoundsComponent } from './all-rounds/all-rounds.component';
import { AddRoundComponent } from './add-round/add-round.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoundTypeOneComponent } from './round-type-one/round-type-one.component';
import { RoundTypeTwoComponent } from './round-type-two/round-type-two.component';
import { RoundTypeThreeComponent } from './round-type-three/round-type-three.component';
import { RoundTypeFourComponent } from './round-type-four/round-type-four.component';
import { RoundTypeFiveComponent } from './round-type-five/round-type-five.component';
import { RoundTypeSixComponent } from './round-type-six/round-type-six.component';

@NgModule({
  declarations: [LessionDetailComponent, AllRoundsComponent, AddRoundComponent, RoundTypeOneComponent, RoundTypeTwoComponent, RoundTypeThreeComponent, RoundTypeFourComponent, RoundTypeFiveComponent, RoundTypeSixComponent],
  imports: [
    CommonModule,
    LessionDetailRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class LessionDetailModule {}
