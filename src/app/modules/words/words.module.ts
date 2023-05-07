import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WordsRoutingModule } from './words-routing.module';
import { WordsComponent } from './words/words.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WordsComponent],
  imports: [
    CommonModule,
    WordsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class WordsModule {}
