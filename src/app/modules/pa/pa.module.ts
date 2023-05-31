import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaRoutingModule } from './pa-routing.module';
import { PaComponent } from './pa/pa.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaComponent],
  imports: [CommonModule, PaRoutingModule, SharedModule, ReactiveFormsModule],
})
export class PaModule {}
