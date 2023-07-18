
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordComplexityService {
  getPasswordStrength(password: string): 'easy' | 'medium' | 'strong' {
    if (!password || password.length === 0) {
      return 'easy';
    }

    if (password.length < 8) {
      return 'easy';
    }

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    if (hasLetters && hasDigits && hasSymbols) {
      return 'strong';
    } else if (
      (hasLetters && hasDigits) ||
      (hasLetters && hasSymbols) ||
      (hasDigits && hasSymbols)
    ) {
      return 'medium';
    } else {
      return 'easy';
    }
  }
}
