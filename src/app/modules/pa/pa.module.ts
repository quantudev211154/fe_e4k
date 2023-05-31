import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaRoutingModule } from './pa-routing.module';
import { PaComponent } from './pa/pa.component';


@NgModule({
  declarations: [
    PaComponent
  ],
  imports: [
    CommonModule,
    PaRoutingModule
  ]
})
export class PaModule { }
