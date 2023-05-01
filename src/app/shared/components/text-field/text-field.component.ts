import { Component, Input, forwardRef } from '@angular/core';
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent {
  @Input() control: FormControl;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;

  constructor() {}
}
