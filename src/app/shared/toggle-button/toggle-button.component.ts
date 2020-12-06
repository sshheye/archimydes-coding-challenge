import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleButtonComponent),
      multi: true
    }
  ]
})
export class ToggleButtonComponent implements OnInit, ControlValueAccessor {

  constructor() { }
  value: boolean;
  @Input() label: string;
  @Input() classNames: string;
  ngOnInit() {
  }
  onChange: (value?: any) => void;

  onTouch: (event: any) => void;

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onInput(value: boolean) {
    if (this.onChange)
      this.onChange(value);
  }
  onTouched(value: boolean) {
    if (this.onTouch) {
      this.onTouch(value);
    }
  }
  toggleCheckboxValue() {
    this.value = !this.value;
    this.onInput(this.value);
    this.onTouched(this.value);
  }
}
