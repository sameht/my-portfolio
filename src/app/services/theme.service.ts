// src/app/services/theme.service.ts
import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // Default to dark mode for a tech portfolio
  theme = signal<'light' | 'dark'>(
    (localStorage.getItem('user-theme') as 'light' | 'dark') || 'dark'
  );

  constructor() {
    effect(() => {
      const currentTheme = this.theme();
      localStorage.setItem('user-theme', currentTheme);
      
      // We toggle the 'light' class because your CSS defaults to dark
      if (currentTheme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    });
  }

  toggleTheme() {
    this.theme.update(t => t === 'light' ? 'dark' : 'light');
  }
}