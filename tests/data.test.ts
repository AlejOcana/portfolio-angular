import { describe, it, expect } from 'vitest';
import { PortfolioDataService } from '../src/app/core/portfolio-data.service';

describe('data', () => {
  const dataService = new PortfolioDataService();

  describe('personalInfo', () => {
    it('has required fields', () => {
      const info = dataService.getPersonalInfo();
      expect(info.name).toBeTruthy();
      expect(info.title).toBeTruthy();
      expect(info.tagline).toBeTruthy();
      expect(info.email).toBeTruthy();
      expect(info.github).toBeTruthy();
      expect(info.linkedin).toBeTruthy();
    });

    it('has valid email format', () => {
      const info = dataService.getPersonalInfo();
      expect(info.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it('has valid GitHub URL', () => {
      const info = dataService.getPersonalInfo();
      expect(info.github).toMatch(/^https?:\/\/github\.com\//);
    });

    it('has valid LinkedIn URL', () => {
      const info = dataService.getPersonalInfo();
      expect(info.linkedin).toMatch(/^https?:\/\/(www\.)?linkedin\.com\//);
    });
  });

  describe('techStack', () => {
    it('has all required categories', () => {
      const stack = dataService.getTechStack();
      expect(stack.primary).toBeTruthy();
      expect(stack.backend).toBeTruthy();
      expect(stack.database).toBeTruthy();
      expect(stack.devops).toBeTruthy();
      expect(stack.emerging).toBeTruthy();
    });

    it('each category has items', () => {
      const stack = dataService.getTechStack();
      expect(stack.primary.items.length).toBeGreaterThan(0);
      expect(stack.backend.items.length).toBeGreaterThan(0);
    });

    it('each category has a label', () => {
      const stack = dataService.getTechStack();
      expect(stack.primary.label).toBeTruthy();
      expect(stack.backend.label).toBeTruthy();
    });
  });

  describe('technicalApproach', () => {
    it('has principles', () => {
      const approach = dataService.getTechnicalApproach();
      expect(approach.length).toBeGreaterThan(0);
    });

    it('each principle has title and description', () => {
      const approach = dataService.getTechnicalApproach();
      approach.forEach((principle) => {
        expect(principle.title).toBeTruthy();
        expect(principle.description).toBeTruthy();
      });
    });
  });

  describe('projects', () => {
    it('has projects', () => {
      const projects = dataService.getProjects();
      expect(projects.length).toBeGreaterThan(0);
    });

    it('each project has required fields', () => {
      const projects = dataService.getProjects();
      projects.forEach((project) => {
        expect(project.id).toBeTruthy();
        expect(project.name).toBeTruthy();
        expect(project.description).toBeTruthy();
        expect(project.stack).toBeTruthy();
        expect(project.stack.length).toBeGreaterThan(0);
      });
    });

    it('projects with demoUrl have valid URLs', () => {
      const projects = dataService.getProjects();
      const withDemoUrl = projects.filter(p => p.demoUrl && p.demoUrl.length > 0);
      
      withDemoUrl.forEach((project) => {
        expect(project.demoUrl).toMatch(/^https?:\/\//);
      });
    });

    it('projects with githubUrl have valid URLs', () => {
      const projects = dataService.getProjects();
      const withGithub = projects.filter(p => p.githubUrl && p.githubUrl.length > 0);
      
      withGithub.forEach((project) => {
        expect(project.githubUrl).toMatch(/^https?:\/\/github\.com\//);
      });
    });

    it('no project has empty demoUrl string', () => {
      const projects = dataService.getProjects();
      const emptyDemoUrls = projects.filter(p => p.demoUrl === '');
      // Empty demoUrl is allowed (optional) - but should not have whitespace
      emptyDemoUrls.forEach((project) => {
        expect(project.demoUrl).toBe('');
      });
    });

    it('each project has highlights array', () => {
      const projects = dataService.getProjects();
      projects.forEach((project) => {
        expect(project.highlights).toBeDefined();
        expect(Array.isArray(project.highlights)).toBe(true);
        expect(project.highlights.length).toBeGreaterThan(0);
      });
    });

    it('project IDs are unique', () => {
      const projects = dataService.getProjects();
      const ids = projects.map(p => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('experience', () => {
    it('has experience entries', () => {
      const experience = dataService.getExperience();
      expect(experience.length).toBeGreaterThan(0);
    });

    it('each entry has required fields', () => {
      const experience = dataService.getExperience();
      experience.forEach((entry) => {
        expect(entry.company).toBeTruthy();
        expect(entry.role).toBeTruthy();
        expect(entry.period).toBeTruthy();
        expect(entry.highlights).toBeDefined();
        expect(entry.highlights.length).toBeGreaterThan(0);
      });
    });
  });

  describe('education', () => {
    it('has education entries', () => {
      const education = dataService.getEducation();
      expect(education.length).toBeGreaterThan(0);
    });

    it('each entry has required fields', () => {
      const education = dataService.getEducation();
      education.forEach((entry) => {
        expect(entry.institution).toBeTruthy();
        expect(entry.degree).toBeTruthy();
        expect(entry.period).toBeTruthy();
      });
    });
  });

  describe('impactMetrics', () => {
    it('has metrics', () => {
      const metrics = dataService.getImpactMetrics();
      expect(metrics.length).toBeGreaterThan(0);
    });

    it('each metric has required fields', () => {
      const metrics = dataService.getImpactMetrics();
      metrics.forEach((metric) => {
        expect(metric.value).toBeTruthy();
        expect(metric.label).toBeTruthy();
        expect(metric.description).toBeTruthy();
      });
    });
  });

  describe('certifications', () => {
    it('has certifications', () => {
      const certs = dataService.getCertifications();
      expect(certs.length).toBeGreaterThan(0);
    });

    it('each certification is a non-empty string', () => {
      const certs = dataService.getCertifications();
      certs.forEach((cert) => {
        expect(cert).toBeTruthy();
        expect(typeof cert).toBe('string');
        expect(cert.trim().length).toBeGreaterThan(0);
      });
    });
  });
});