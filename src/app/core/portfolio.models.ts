export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  summary: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface ImpactMetric {
  value: string;
  label: string;
  description: string;
}

export interface TechStackCategory {
  label: string;
  items: string[];
}

export interface TechStack {
  primary: TechStackCategory;
  backend: TechStackCategory;
  database: TechStackCategory;
  devops: TechStackCategory;
  emerging: TechStackCategory;
}

export interface TechnicalPrinciple {
  title: string;
  description: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  metrics: string;
  highlights: string[];
  demoUrl: string;
  githubUrl: string;
  comingSoon?: boolean;
}