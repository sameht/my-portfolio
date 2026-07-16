import {
  Component,
  ElementRef,
  HostListener,
  signal,
  computed,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type Project = {
  title: string;
  client: string;
  period: string;
  summary: string;
  stack: string[];
  media?: {
    type: 'image' | 'video';
    src: string;
    poster?: string;
  };
};

type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
})
export class PortfolioComponent implements OnInit, AfterViewInit {

  /* -----------------------------------------------------------------------
   * Theme
   * --------------------------------------------------------------------- */

  theme = signal<'dark' | 'light'>('dark');

  toggleTheme() {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);

    document.documentElement.classList.toggle(
      'dark',
      next === 'dark'
    );

    document.documentElement.classList.toggle(
      'light',
      next === 'light'
    );

    localStorage.setItem('theme', next);
  }


  /* -----------------------------------------------------------------------
   * Navbar scroll state
   * --------------------------------------------------------------------- */

  scrolled = signal(false);
  Object = Object;
  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 20);
  }


  /* -----------------------------------------------------------------------
   * Data
   * --------------------------------------------------------------------- */

  projects = signal<Project[]>([
    {
      title: 'Porsche School Management System',
      client: 'EDLIGO · Porsche',
      period: '2024 — Present',
      summary:
        'Enterprise school-management platform for Porsche. Led frontend architecture and Angular 18 migration, improving performance by 20% and reducing bundle size.',
      stack: [
        'Angular 18',
        'TypeScript',
        'RxJS',
        'AmCharts',
        'Azure DevOps'
      ]
    },

    {
      title: 'AI Recruiter Agents',
      client: 'EDLIGO',
      period: '2024 — Present',
      summary:
        'AI-powered recruitment product with LLM-based candidate matching, generative AI features and talent analytics workflows.',
      stack: [
        'Angular 18',
        'Signals',
        'LLM APIs',
        'Jest'
      ]
    },

    {
      title: 'Sesame University Platform',
      client: 'EDLIGO',
      period: '2024 — Present',
      summary:
        'Higher-education SaaS supporting thousands of active users. Built reusable component library and frontend standards.',
      stack: [
        'Angular 18',
        'TypeScript',
        'PostgreSQL',
        'Jenkins'
      ]
    },

    {
      title: 'Capgemini Talent Analytics',
      client: 'EDLIGO · Capgemini',
      period: '2019 — 2023',
      summary:
        'Workforce analytics platform. Optimized SQL and data pipelines, cutting report generation time by 30%.',
      stack: [
        'Angular 10',
        '.NET Core',
        'PostgreSQL',
        'RxJS'
      ],
      media: {
        type: 'video',
        src: 'assets/videos/video_cap.mp4'
      }
    },
    {
      title: 'Wipro Talent Analytics',
      client: 'EDLIGO · Wipro',
      period: '2019 — 2023',
      summary:
        'Talent-management analytics for a global consulting firm. Contributed to API design and full-stack delivery.',
      stack: [
        'Angular 10',
        '.NET Core',
        'Scala',
        'Azure DevOps'
      ]
    },

    {
      title: 'Multi-Touch Attribution Model',
      client: 'MASS Analytics',
      period: '2018 — 2019',
      summary:
        'Probabilistic MTA model using Bayesian networks over 10,000+ customer touchpoints.',
      stack: [
        'AngularJS',
        'Python',
        'pyAgrum',
        'Google Analytics'
      ]
    }
  ]);


  experience = signal<Experience[]>([
    {
      role: 'Lead Frontend Developer (Technical Lead)',
      company: 'EDLIGO',
      location: 'Germany · Remote',
      period: 'Jan 2024 — Present',
      bullets: [
        'Lead frontend architecture for enterprise SaaS in Education & HR Tech.',
        'Manage and mentor a team of 3 developers; increased sprint velocity by 10%.',
        'Architect AI-powered recruitment frontends with LLM matching.',
        'Led Angular 18 migration improving performance and bundle size.'
      ]
    },

    {
      role: 'Full Stack Developer',
      company: 'EDLIGO',
      location: 'Tunisia',
      period: 'Mar 2019 — Dec 2023',
      bullets: [
        'Built scalable Angular applications with RxJS and modular architecture.',
        'Improved performance using lazy loading and optimization.',
        'Contributed to .NET Core APIs.',
        'Optimized SQL queries reducing report generation time.'
      ]
    },

    {
      role: 'Full Stack Developer / Data Analyst',
      company: 'MASS Analytics',
      location: 'Tunisia',
      period: 'Mar 2018 — Feb 2019',
      bullets: [
        'Built AngularJS dashboards.',
        'Created Bayesian Multi-Touch Attribution models.',
        'Processed large datasets and improved model accuracy.'
      ]
    }
  ]);


  skills = signal<Record<string, string[]>>({

    Frontend: [
      'Angular 10–18',
      'Signals',
      'AngularJS',
      'TypeScript',
      'RxJS',
      'HTML5',
      'CSS3',
      'Angular Material',
      'PrimeNG',
      'Bootstrap'
    ],

    Backend: [
      '.NET Core',
      'C#',
      'Spring Boot',
      'Java',
      'Node.js',
      'NestJS',
      'REST APIs'
    ],

    Data: [
      'PostgreSQL',
      'SQL'
    ],

    Testing: [
      'Cypress',
      'Jest'
    ],

    'Tools & DevOps': [
      'Git',
      'Azure DevOps',
      'Jenkins',
      'Agile / Scrum'
    ]
  });


  stats = [
    {
      value: '7+',
      label: 'Years shipping'
    },
    {
      value: '3',
      label: 'Devs mentored'
    },
    {
      value: '20%',
      label: 'Performance gain (ng18)'
    },
    {
      value: '30%',
      label: 'Faster reports'
    }
  ];


  /* -----------------------------------------------------------------------
   * Video references
   * --------------------------------------------------------------------- */

  videoRefs = new Map<number, ElementRef<HTMLVideoElement>>();


  setVideoRef(
    index: number,
    ref: ElementRef<HTMLVideoElement>
  ) {
    this.videoRefs.set(index, ref);
  }


  playVideo(index: number) {
    this.videoRefs
      .get(index)
      ?.nativeElement
      .play();
  }


  pauseVideo(index: number) {
    this.videoRefs
      .get(index)
      ?.nativeElement
      .pause();
  }



  /* -----------------------------------------------------------------------
   * Lifecycle
   * --------------------------------------------------------------------- */

  ngOnInit() {

    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;

    const current = saved ?? 'dark';
    this.theme.set(current);

    document.documentElement.classList.add(
      current
    );
  }

  ngAfterViewInit() { }



  /* -----------------------------------------------------------------------
   * Helpers
   * --------------------------------------------------------------------- */

  year = computed(
    () => new Date().getFullYear()
  );


  trackByTitle(
    _: number,
    item: Project
  ) {
    return item.title;
  }


  trackByText(
    _: number,
    item: string
  ) {
    return item;
  }


}