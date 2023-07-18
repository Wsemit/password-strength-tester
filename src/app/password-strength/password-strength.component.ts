// password-strength.component.ts
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PasswordComplexityService } from '../password-complexity.service';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordStrengthComponent),
      multi: true,
    },
  ],
})
export class PasswordStrengthComponent implements ControlValueAccessor {
  password: string = '';
  passwordStrength: 'easy' | 'medium' | 'strong' = 'easy';

  constructor(private passwordComplexityService: PasswordComplexityService) {}

  onChange: any = () => {};
  onTouched: any = () => {};

  setDisabledState(isDisabled: boolean): void {}

  writeValue(value: string): void {
    this.password = value;
    this.updatePasswordStrength();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onPasswordChange(event: Event): void {
    const password = (event.target as HTMLInputElement).value;
    this.password = password;
    this.updatePasswordStrength();
    this.onChange(this.password);
    this.onTouched();
  }

  private updatePasswordStrength(): void {
    this.passwordStrength = this.passwordComplexityService.getPasswordStrength(
      this.password
    );
  }
}
