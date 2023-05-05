import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailRoutingModule } from './course-detail-routing.module';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CourseDetailComponent],
  imports: [CommonModule, CourseDetailRoutingModule, SharedModule],
})
export class CourseDetailModule {}
