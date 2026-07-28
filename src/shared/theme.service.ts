import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private storageKey = 'app-theme';

  constructor() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored === 'dark') {
      this.applyDark();
    }
  }

  toggleTheme() {
    if (document.documentElement.classList.contains('dark-theme')) {
      this.applyLight();
    } else {
      this.applyDark();
    }
  }

  private applyDark() {
    document.documentElement.classList.add('dark-theme');
    localStorage.setItem(this.storageKey, 'dark');
  }

  private applyLight() {
    document.documentElement.classList.remove('dark-theme');
    localStorage.setItem(this.storageKey, 'light');
  }
}
