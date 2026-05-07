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
    
    const scrollButton = page.locator('button[aria-label="Scroll to top"]');
    await expect(scrollButton).toBeVisible();
    
    await scrollButton.click();
    await expect(scrollButton).not.toBeVisible();
  });

  test('navbar navigation links work', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('link', { name: 'Experience' }).click();
    await expect(page.locator('#experience')).toBeVisible();
  });

  test('about section has profile text', async ({ page }) => {
    await page.goto('/#about');
    
    await expect(page.getByText(/Senior Full-Stack Engineer with 10\+ years/)).toBeVisible();
  });
});

test.describe('SEO Metadata', () => {
  test('has Open Graph meta tags', async ({ page }) => {
    await page.goto('/');
    
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');
    const ogType = page.locator('meta[property="og:type"]');
    const ogLocale = page.locator('meta[property="og:locale"]');
    
    await expect(ogTitle).toHaveAttribute('content', /Alejandro/);
    await expect(ogDescription).toHaveAttribute('content', /Senior Full-Stack Engineer/);
    await expect(ogType).toHaveAttribute('content', 'profile');
    await expect(ogLocale).toHaveAttribute('content', 'en_ES');
  });

  test('has Twitter Card meta tags', async ({ page }) => {
    await page.goto('/');
    
    const twitterCard = page.locator('meta[name="twitter:card"]');
    const twitterTitle = page.locator('meta[name="twitter:title"]');
    const twitterDesc = page.locator('meta[name="twitter:description"]');
    
    await expect(twitterCard).toHaveAttribute('content', 'summary');
    await expect(twitterTitle).toHaveAttribute('content', /Alejandro/);
    await expect(twitterDesc).toHaveAttribute('content', /Senior Full-Stack Engineer/);
  });

  test('has theme-color meta tags', async ({ page }) => {
    await page.goto('/');
    
    const themeColorDark = page.locator('meta[name="theme-color"]:not([media])');
    const themeColorLight = page.locator('meta[name="theme-color"][media*="light"]');
    
    await expect(themeColorDark).toHaveAttribute('content', '#09090b');
    await expect(themeColorLight).toHaveAttribute('content', '#fafafa');
  });

  test('has JSON-LD Person schema', async ({ page }) => {
    await page.goto('/');
    
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
    
    const content = await jsonLd.textContent();
    const parsed = JSON.parse(content || '{}');
    
    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed['@type']).toBe('Person');
    expect(parsed.name).toBe('Alejandro Ocaña Garcia');
    expect(parsed.jobTitle).toBe('Senior Full-Stack Engineer');
    expect(parsed.url).toContain('github.com');
  });

  test('has required meta description', async ({ page }) => {
    await page.goto('/');
    
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /Senior Full-Stack Engineer/);
  });
});

test.describe('Link Integrity', () => {
  test('no links with empty href', async ({ page }) => {
    await page.goto('/');
    
    const emptyLinks = page.locator('a[href=""]');
    expect(await emptyLinks.count()).toBe(0);
  });

  test('no links with href about:blank', async ({ page }) => {
    await page.goto('/');
    
    const blankLinks = page.locator('a[href="about:blank"]');
    expect(await blankLinks.count()).toBe(0);
  });

  test('external links have rel="noopener noreferrer"', async ({ page }) => {
    await page.goto('/');
    
    // Find all external links (excluding same-origin)
    const externalLinks = page.locator('a[href^="http"]:not([href*="localhost"]):not([href^="/"])');
    const count = await externalLinks.count();
    
    for (let i = 0; i < count; i++) {
      const link = externalLinks.nth(i);
      const rel = await link.getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });

  test('all anchor tags have valid href', async ({ page }) => {
    await page.goto('/');
    
    const links = page.locator('a');
    const count = await links.count();
    
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      
      // Links should have href (may be empty for scroll anchors)
      if (text && text.trim().length > 0) {
        expect(href).toBeTruthy();
      }
    }
  });
});

test.describe('Portfolio Website - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('hamburger menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const toggle = page.locator('.navbar-toggle');
    await expect(toggle).toBeVisible();
    
    // Open menu
    await toggle.click();
    await expect(page.locator('.navbar-nav.open')).toBeVisible();
    
    // Close by clicking toggle again (backdrop not clickable when hidden)
    await toggle.click();
    await expect(page.locator('.navbar-nav.open')).not.toBeVisible();
  });

  test('mobile menu has all navigation links', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('.navbar-toggle').click();
    
    await expect(page.locator('.nav-link', { hasText: 'About' })).toBeVisible();
    await expect(page.locator('.nav-link', { hasText: 'Experience' })).toBeVisible();
    await expect(page.locator('.nav-link', { hasText: 'Projects' })).toBeVisible();
    await expect(page.locator('.nav-link', { hasText: 'Tech Stack' })).toBeVisible();
    await expect(page.locator('.nav-cta')).toBeVisible();
  });

  test('mobile menu closes when clicking nav link', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('.navbar-toggle').click();
    await expect(page.locator('.navbar-nav.open')).toBeVisible();
    
    await page.locator('.nav-link', { hasText: 'About' }).click();
    await expect(page.locator('.navbar-nav.open')).not.toBeVisible();
  });

  test('mobile menu closes when clicking Get in Touch', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('.navbar-toggle').click();
    await expect(page.locator('.navbar-nav.open')).toBeVisible();
    
    await page.locator('.nav-cta').click();
    await expect(page.locator('.navbar-nav.open')).not.toBeVisible();
  });

  test('page is responsive on mobile viewport', async ({ page }) => {
    await page.goto('/');
    
    const navbar = page.locator('.navbar');
    await expect(navbar).toBeVisible();
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.hero-actions')).toBeVisible();
  });
});

test.describe('Portfolio Accessibility', () => {
  test('text is selectable', async ({ page }) => {
    await page.goto('/#about');
    
    // Get selected text content
    const selected = await page.evaluate(() => {
      const sel = window.getSelection();
      if (sel) {
        const range = document.createRange();
        const textNode = document.querySelector('.about-text');
        if (textNode) {
          range.selectNodeContents(textNode);
          sel.removeAllRanges();
          sel.addRange(range);
        }
        return sel.toString();
      }
      return '';
    });
    
    expect(selected.length).toBeGreaterThan(20);
  });

  test('navbar toggle has accessible name', async ({ page }) => {
    await page.goto('/');
    
    const toggle = page.locator('.navbar-toggle');
    await expect(toggle).toHaveAttribute('aria-label', /menu|navigation/i);
    await expect(toggle).toHaveAttribute('aria-controls', 'navbar-menu');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('navbar menu has correct ARIA associations', async ({ page }) => {
    // Mobile viewport required to show hamburger
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const menu = page.locator('#navbar-menu');
    const toggle = page.locator('.navbar-toggle');
    
    // Initial state
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveAttribute('aria-controls', 'navbar-menu');
    
    // After click - menu is visible (not hidden)
    await toggle.click();
    await expect(menu).toHaveClass(/open/);
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});