import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { ButtonComponent } from './components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TextFieldComponent, ButtonComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [TextFieldComponent, ButtonComponent],
})
export class SharedModule {}
