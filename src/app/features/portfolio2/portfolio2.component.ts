import { Component, effect, inject, signal } from '@angular/core';
import { ThemeService } from './../../services/theme.service';

@Component({
  selector: 'app-portfolio2.component',
  imports: [],
  templateUrl: './portfolio2.component.html',
  styleUrl: './portfolio2.component.scss',
})
export class Portfolio2Component {

  public themeService = inject(ThemeService);
  theme = signal<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
  );

  protected readonly userName = signal('Sameh Tekaya');
  stats = signal([
    {
      value: '7+',
      title: 'Years Experience',
      subtitle: 'Enterprise Software'
    },
    {
      value: '+20%',
      title: 'Performance',
      subtitle: 'Angular 18 Migration'
    },
    {
      value: '+30%',
      title: 'SQL Optimization',
      subtitle: 'Reporting Performance'
    },
    {
      value: '+10%',
      title: 'Sprint Velocity',
      subtitle: 'Team Leadership'
    }
  ]);

  skills = signal([
    {
      category: 'Frontend',
      items: ['Angular 18', 'Angular Signals', 'TypeScript', 'RxJS', 'JavaScript', 'HTML5', 'CSS3']
    },
    {
      category: 'UI',
      items: ['PrimeNG', 'Angular Material', 'Bootstrap', 'SCSS']
    },
    {
      category: 'Backend',
      items: ['.NET Core', 'Spring Boot', 'NestJS', 'REST APIs']
    },
    {
      category: 'Database',
      items: ['PostgreSQL', 'SQL']
    },
    {
      category: 'Tools',
      items: ['Azure DevOps', 'Git', 'Jenkins', 'Jest', 'Cypress']
    }
  ]);
  projects = signal([
    {
      title: 'Porsche School Management System',
      client: 'Porsche',
      type: 'Enterprise SaaS',
      description:
        'Led frontend architecture, Angular 18 migration and reusable component design for an enterprise education platform.',
      technologies: ['Angular 18', 'RxJS', 'PostgreSQL']
    },

    {
      title: 'AI Recruiter Agents',
      client: 'EDLIGO',
      type: 'Generative AI',
      description:
        'Designed enterprise interfaces for AI-powered recruitment using LLM-based candidate matching and talent analytics.',
      technologies: ['Angular', 'AI', 'TypeScript']
    },

    {
      title: 'Sesame University Platform',
      client: 'Sesame University',
      type: 'Education Analytics',
      description:
        'Developed dashboards for attendance monitoring, accreditation and educational analytics.',
      technologies: ['Angular', 'PostgreSQL']
    },

    {
      title: 'Talent Analytics Platform',
      client: 'Capgemini / Wipro',
      type: 'HR Analytics',
      description:
        'Built workforce analytics dashboards while optimizing SQL queries and application performance.',
      technologies: ['Angular', '.NET Core', 'SQL']
    }
  ]);

  experience = signal([
    {
      period: 'Jan 2024 — Present',
      title: 'Lead Frontend Developer (Technical Lead)',
      company: 'EDLIGO · Germany (Remote)',
      achievements: [
        'Lead frontend architecture for enterprise SaaS products',
        'Manage and mentor 3 developers',
        'Angular 18 migration',
        '20% application performance improvement',
        'AI-powered recruitment platform',
        'Architecture decisions and Agile leadership'
      ]
    },

    {
      period: 'Mar 2019 — Dec 2023',
      title: 'Full Stack Developer',
      company: 'EDLIGO · Tunisia',
      achievements: [
        'Enterprise HR analytics platforms',
        '.NET Core backend development',
        'Reusable Angular architecture',
        '30% SQL performance improvement'
      ]
    },

    {
      period: 'Mar 2018 — Feb 2019',
      title: 'Full Stack Developer / Data Analyst',
      company: 'MASS Analytics',
      achievements: [
        'AngularJS dashboards',
        'Bayesian prediction models',
        'Google Analytics',
        'Python Data Science'
      ]
    }
  ]);

  achievements = signal([
    'Technical Lead',
    '7+ Years Experience',
    'Angular 18 Migration',
    '20% Performance Improvement',
    '30% SQL Optimization',
    '10% Sprint Velocity Increase',
    'Enterprise SaaS',
    'AI-powered Recruitment Platform'
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
