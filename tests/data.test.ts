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
});