import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class CoursesModule {}
