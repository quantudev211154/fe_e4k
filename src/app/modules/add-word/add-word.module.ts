import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddWordRoutingModule } from './add-word-routing.module';
import { AddWordComponent } from './add-word/add-word.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddWordComponent],
  imports: [
    CommonModule,
    AddWordRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
  ],
})
export class AddWordModule {}
