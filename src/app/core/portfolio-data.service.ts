import { Injectable } from '@angular/core';
import { 
  PersonalInfo, 
  ImpactMetric, 
  TechStack, 
  TechnicalPrinciple, 
  Experience, 
  Education, 
  Project 
} from './portfolio.models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  getPersonalInfo(): PersonalInfo {
    return {
      name: 'Alejandro Ocaña Garcia',
      title: 'Senior Full-Stack Engineer',
      subtitle: '10+ years building web applications. Currently Tech Lead for ERP Frontend Chapter at Metro Markets.',
      tagline: 'Building scalable web applications.',
      summary: `Senior Full-Stack Engineer with 10+ years of experience in web development. Currently serving as Tech Lead for the ERP Frontend Chapter at Metro Markets, where I coordinate frontend developers, drive technical improvements, and ensure best practices across the team.

My career spans from full-stack development to project management and team leadership. I've worked with Angular, React, PHP/Symfony, .NET, and various databases. I bring a pragmatic approach focused on delivering working solutions efficiently.

Currently deepening my skills in AI and Big Data through specialized studies, with interest in applying these technologies to real-world problems.

Open to remote opportunities where I can contribute to meaningful projects.`,
       email: 'Alejandro.Ocana.Garcia.1988@gmail.com',
       github: 'https://github.com/AlejOcana',
       linkedin: 'https://www.linkedin.com/in/alejandro-ocana-garcia',
       location: 'Inca, Balearic Islands, Spain',
    };
  }

  getImpactMetrics(): ImpactMetric[] {
    return [
      {
        value: '10+',
        label: 'Years Experience',
        description: 'Building web applications since 2016',
      },
      {
        value: '4',
        label: 'Companies Led',
        description: 'Engineering and project leadership roles',
      },
      {
        value: '10+',
        label: 'Developers Mentored',
        description: 'Through frontend chapter coordination',
      },
      {
        value: 'Remote',
        label: 'Work Ready',
        description: 'Flexible for international opportunities',
      },
    ];
  }

  getTechStack(): TechStack {
    return {
      primary: {
        label: 'Frontend',
        items: ['Angular', 'TypeScript', 'React', 'JavaScript'],
      },
      backend: {
        label: 'Backend',
        items: ['PHP/Symfony', '.NET', 'Java', 'Node.js'],
      },
      database: {
        label: 'Databases',
        items: ['MySQL', 'SQL Server', 'Oracle', 'PostgreSQL'],
      },
      devops: {
        label: 'DevOps & Tools',
        items: ['Docker', 'Kubernetes', 'GitLab CI/CD', 'Azure Pipelines'],
      },
      emerging: {
        label: 'Learning',
        items: ['AI & Big Data', 'LLM Integration', 'ML Systems'],
      },
    };
  }

  getTechnicalApproach(): TechnicalPrinciple[] {
    return [
      {
        title: 'Full-Stack Perspective',
        description: 'Experience across frontend and backend helps me design solutions that work holistically. I understand how decisions in one layer affect the other.',
      },
      {
        title: 'Technical Leadership',
        description: 'Leading the ERP Frontend Chapter means coordinating a team of developers, establishing best practices, and ensuring technical quality across projects.',
      },
      {
        title: 'Clean Architecture',
        description: 'From microservices design to API integrations, I focus on creating maintainable, scalable systems rather than quick fixes.',
      },
      {
        title: 'Continuous Learning',
        description: 'Currently expanding into AI and Big Data. I believe in staying current while applying knowledge practically.',
      },
    ];
  }

  getExperience(): Experience[] {
    return [
      {
        company: 'Metro Markets Palma SLU',
        role: 'Senior Full-Stack Engineer & ERP Frontend Chapter Tech Lead',
        period: 'May 2023 - Present',
        highlights: [
          'Leading ERP Frontend Chapter with 5+ frontend developers',
          'Full-stack development with Angular (TypeScript) and PHP (Symfony)',
          'Docker & Kubernetes for containerization',
          'GitLab CI/CD with SonarQube and Sentry',
          'Microservices architecture implementation',
        ],
      },
      {
        company: 'Babtec Information Systems Spain',
        role: 'Senior Full-Stack Software Engineer',
        period: 'June 2022 - April 2023',
        highlights: [
          'QMS solutions development',
          'Azure Pipelines for CI/CD implementation',
          'Cross-functional team collaboration (Spain + Germany)',
          '.NET Framework and Angular development',
        ],
      },
      {
        company: 'CGI Inc. Spain',
        role: 'IT Project Manager',
        period: 'September 2021 - June 2022',
        highlights: [
          'Managed 10+ developers divided into several teams',
          'Project planning with Microsoft Project',
          'Stakeholder communication and presales',
          'Agile methodologies with JIRA',
        ],
      },
      {
        company: 'Affinity Solutions S.L.',
        role: 'Software Engineer & Tech Lead',
        period: 'July 2017 - September 2021',
        highlights: [
          'Tech Lead for ERP, CRM, POS, BI, eCommerce integrations',
          'Custom software development',
          'RESTful API development',
          'Data migration and architectural restructuring',
        ],
      },
    ];
  }

  getEducation(): Education[] {
    return [
      {
        institution: 'IEDIB',
        degree: 'Specialization in AI and Big Data',
        period: '2024 - 2025',
        description: 'AI models, AI programming, ML Systems, Big Data Systems',
      },
      {
        institution: 'FOC',
        degree: 'Higher Level Training Cycle - Web Application Development',
        period: '2016 - 2018',
        description: 'CFGS Desarrollo de Aplicaciones Web',
      },
    ];
  }

  getCertifications(): string[] {
    return [
      'Microsoft Certified: Data Analyst Associate',
      'Flexygo LOW, MID and HIGH CODING Certification',
      'Product Creation Certification',
    ];
  }

  getProjects(): Project[] {
    return [
      {
        id: 'portfolio',
        name: 'Professional Portfolio',
        tagline: 'This website',
        description: "You're looking at it. Built to present my work professionally and connect with opportunities.",
        stack: ['Angular', 'TypeScript', 'SCSS', 'Angular Animations'],
        metrics: 'Clean, fast, and professional',
        highlights: ['Single-page application', 'Responsive design', 'Dark mode support', 'Optimized performance'],
        demoUrl: '',
        githubUrl: 'https://github.com/AlejOcana/portfolio-angular',
        comingSoon: false,
      },
      {
        id: 'opsflow',
        name: 'OpsFlow',
        tagline: 'Incident management system',
        description: 'Full-stack incident management system with .NET 8 backend, Angular 21 frontend, PostgreSQL database, and JWT authentication. Features role-based access control, dashboard with stats, incident tracking with filtering, and team management with member display.',
        stack: ['.NET 8', 'Angular 21', 'PostgreSQL', 'Docker', 'JWT', 'EF Core'],
        metrics: 'Docker-ready, API with Swagger',
        highlights: ['JWT authentication', 'Role-based access control', 'Dashboard with stats', 'Incident filtering', 'Team members display'],
        demoUrl: '',
        githubUrl: 'https://github.com/AlejOcana/opsflow',
        comingSoon: false,
      },
      {
        id: 'prodlens',
        name: 'ProdLens',
        tagline: 'AI-powered product feedback analysis',
        description: 'Angular 21 application that analyzes product feedback using OpenAI GPT models. Features dashboard with feedback stats, analyzer with batch processing, and results view with pain points and recommendations. Includes caching, metrics tracking, and demo mode.',
        stack: ['Angular 21', 'TypeScript', 'SCSS', 'Signals', 'OpenAI API'],
        metrics: '90% test coverage, 251KB bundle',
        highlights: ['Standalone components', 'Signal-based state', 'In-memory cache with TTL', 'Cost estimation', 'Unit & E2E tests'],
        demoUrl: '',
        githubUrl: 'https://github.com/AlejOcana/prodlens',
        comingSoon: false,
      },
      {
        id: 'performance-lab-ang',
        name: 'Performance Lab Angular',
        tagline: 'Frontend optimization demo',
        description: 'A high-performance dashboard demonstrating the difference between unoptimized and optimized Angular implementations. Features virtual scrolling, lazy loading with @defer, signals, and Chart.js visualizations.',
        stack: ['Angular 21', 'TypeScript', 'SCSS', 'Chart.js', 'Angular CDK'],
        metrics: 'Virtual scrolling for 10K+ rows',
        highlights: ['@defer lazy loading', 'Virtual scrolling with CDK', 'Signals for state management', 'Responsive design'],
        demoUrl: '',
        githubUrl: 'https://github.com/AlejOcana/performance-lab-ang',
        comingSoon: false,
      },
      {
        id: 'loyaltyiq',
        name: 'LoyaltyIQ',
        tagline: 'Customer intelligence platform',
        description: 'Customer insights and loyalty engine for small businesses. Built with Angular 21 frontend and .NET 8 Web API, featuring automatic customer segmentation based on visit behavior, KPI dashboard with trends, and PostgreSQL database.',
        stack: ['Angular 21', '.NET 8', 'PostgreSQL', 'Docker', 'EF Core', 'Signals'],
        metrics: 'Full-stack Docker Compose',
        highlights: ['Automatic segmentation', 'KPI dashboard', 'Customer detail view', 'Mobile responsive'],
        demoUrl: '',
        githubUrl: 'https://github.com/AlejOcana/loyaltyiq',
        comingSoon: false,
      },
      {
        id: 'gym-biz',
        name: 'GymBiz',
        tagline: 'Gym business website with admin panel',
        description: 'Gym business website with Angular 18+ and Tailwind CSS. Features public site with hero, services, news, schedule, pricing, and contact sections. Includes admin panel with login protection, content editors for all sections, and localStorage persistence.',
        stack: ['Angular 18+', 'TypeScript', 'Tailwind CSS', 'Signals', 'Reactive Forms'],
        metrics: 'Responsive design, mobile-first',
        highlights: ['Admin panel with CRUD', 'Login protection', 'Responsive sidebar', 'localStorage persistence', 'Lazy-loaded routes'],
        demoUrl: '',
        githubUrl: 'https://github.com/AlejOcana/gym-biz-web',
        comingSoon: false,
      },
      {
        id: 'ai-project',
        name: 'AI Integration Project',
        tagline: 'Learning & exploration',
        description: 'Exploring AI and LLM integration in web applications as part of my current specialization studies.',
        stack: ['Python', 'LLM APIs', 'Angular'],
        metrics: 'In progress',
        highlights: ['Learning in progress', 'Applying AI knowledge', 'Real-world experimentation'],
        demoUrl: '',
        githubUrl: '',
        comingSoon: true,
      },
    ];
  }
}