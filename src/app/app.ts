import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public themeService = inject(ThemeService);
  theme = signal<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
  );

  protected readonly userName = signal('Sameh Tekaya');
  stats = signal([
    { label: 'Years Exp', value: '6+' },
    { label: 'Users Managed', value: '2M+' },
    { label: 'Team Size', value: '4' }
  ]);

  skills =  signal ([
    { name: 'Angular', level: 4 },
    { name: 'TypeScript', level: 4 },
    { name: 'JavaScript', level: 3 },
    { name: 'SQL', level: 3 },
    { name: 'HTML', level: 4 },
  ])
  projects = signal([
    {
      title: 'Edligo Talent Intelligence',
      client: 'Capgemini / Porsche',
      description: 'AI-powered platform managing 2M+ users to measure business impact.',
      tech: ['Angular', '.NET', 'AI Analytics'],
      type: 'Lead'
    },
    {
      title: 'MTA Prediction Tool',
      client: 'Mass Analytics',
      description: 'Bayesian Network solution predicting ad campaign conversion rates.',
      tech: ['AngularJS', 'Machine Learning', 'SQL'],
      type: 'Full-Stack'
    }
  ]);

  constructor() {
    // Effect automatically runs whenever the signal changes
    effect(() => {
      const mode = this.theme();
      localStorage.setItem('theme', mode);
      
      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }

  toggleTheme() {
    this.theme.update(t => t === 'light' ? 'dark' : 'light');
  }
}
