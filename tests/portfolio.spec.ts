import { test, expect } from '@playwright/test';

test.describe('Portfolio Website', () => {
  test('page loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await expect(page).toHaveTitle(/Alejandro/);
    
    const criticalErrors = errors.filter(e => 
      !e.includes('Hydration') && 
      !e.includes('Warning')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('hero section displays correctly', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.hero-actions .btn-primary')).toBeVisible();
    await expect(page.locator('.hero-actions .btn-secondary')).toBeVisible();
  });

  test('all main sections are present', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#impact')).toBeVisible();
    await expect(page.locator('#experience')).toBeVisible();
    await expect(page.locator('#projects')).toBeVisible();
    await expect(page.locator('#stack')).toBeVisible();
  });

  test('footer contact links are present', async ({ page }) => {
    await page.goto('/');
    
    const githubLink = page.locator('a[href*="github.com"]').first();
    const linkedinLink = page.locator('a[href*="linkedin.com"]').first();
    
    await expect(githubLink).toBeVisible();
    await expect(linkedinLink).toBeVisible();
  });

  test('experience section shows companies', async ({ page }) => {
    await page.goto('/#experience');
    
    await expect(page.getByText('Metro Markets Palma SLU')).toBeVisible();
    await expect(page.getByRole('heading', { name: /experience/i })).toBeVisible();
  });

  test('tech stack shows all categories', async ({ page }) => {
    await page.goto('/#stack');
    
    await expect(page.getByText('Frontend', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Backend', { exact: true }).first()).toBeVisible();
  });

  test('projects section displays portfolio', async ({ page }) => {
    await page.goto('/#projects');
    
    await expect(page.getByText('Professional Portfolio')).toBeVisible();
  });

  test('scroll-to-top button works', async ({ page }) => {
    await page.goto('/');
    
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    
    const scrollButton = page.locator('button[aria-label="Scroll to top"]');
    await expect(scrollButton).toBeVisible();
    
    await scrollButton.click();
    await page.waitForTimeout(500);
  });

  test('navbar navigation links work', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('link', { name: 'Experience' }).click();
    await page.waitForTimeout(500);
    await expect(page.locator('#experience')).toBeVisible();
  });

  test('about section has profile text', async ({ page }) => {
    await page.goto('/#about');
    
    await expect(page.getByText(/Senior Full-Stack Engineer with 10\+ years/)).toBeVisible();
  });
});