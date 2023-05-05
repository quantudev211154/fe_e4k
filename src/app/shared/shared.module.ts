import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { ButtonComponent } from './components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconLogoutComponent } from './icons/icon-logout/icon-logout.component';
import { IconAllCourseComponent } from './icons/icon-all-course/icon-all-course.component';
import { IconUserComponent } from './icons/icon-user/icon-user.component';
import { IconMenuComponent } from './icons/icon-menu/icon-menu.component';
import { IconCloseComponent } from './icons/icon-close/icon-close.component';
import { IconUserCircleComponent } from './icons/icon-user-circle/icon-user-circle.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { IconDatabaseComponent } from './icons/icon-database/icon-database.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    TextFieldComponent,
    ButtonComponent,
    IconLogoutComponent,
    IconAllCourseComponent,
    IconUserComponent,
    IconMenuComponent,
    IconCloseComponent,
    IconUserCircleComponent,
    LoadingIndicatorComponent,
    IconDatabaseComponent,
    ModalComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    TextFieldComponent,
    ButtonComponent,
    IconLogoutComponent,
    IconAllCourseComponent,
    IconUserComponent,
    IconMenuComponent,
    IconCloseComponent,
    IconUserCircleComponent,
    LoadingIndicatorComponent,
    ModalComponent,
  ],
})
export class SharedModule {}
