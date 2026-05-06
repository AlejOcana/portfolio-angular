import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconComponent, IconName } from '../src/app/shared/components/icon/icon.component';

describe('IconComponent', () => {
  let fixture: ComponentFixture<IconComponent>;
  let component: IconComponent;

  const iconNames: IconName[] = [
    'github',
    'linkedin',
    'mail',
    'external',
    'arrowRight',
    'chevronDown',
    'chevronUp',
    'mapPin',
    'menu',
    'x',
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('default rendering', () => {
    it('renders with default name "x"', () => {
      fixture.detectChanges();
      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg).toBeTruthy();
      expect(svg.getAttribute('class')).toBe('icon-x');
    });

    it('renders with default size 24', () => {
      fixture.detectChanges();
      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg.getAttribute('width')).toBe('24');
      expect(svg.getAttribute('height')).toBe('24');
    });

    it('has role="img" attribute', () => {
      fixture.detectChanges();
      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg.getAttribute('role')).toBe('img');
    });

    it('has aria-hidden="true" attribute', () => {
      fixture.detectChanges();
      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('name input', () => {
    it('updates CSS class when name changes', () => {
      fixture.componentRef.setInput('name', 'github');
      fixture.detectChanges();
      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg.getAttribute('class')).toBe('icon-github');
    });

    it('updates aria-label when name changes', () => {
      fixture.componentRef.setInput('name', 'linkedin');
      fixture.detectChanges();
      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg.getAttribute('aria-label')).toBe('linkedin');
    });

    it('updates CSS class for all icon names', () => {
      iconNames.forEach((name) => {
        fixture.componentRef.setInput('name', name);
        fixture.detectChanges();
        const svg = fixture.nativeElement.querySelector('svg');
        expect(svg.getAttribute('class')).toBe(`icon-${name}`);
      });
    });

    it('updates aria-label for all icon names', () => {
      iconNames.forEach((name) => {
        fixture.componentRef.setInput('name', name);
        fixture.detectChanges();
        const svg = fixture.nativeElement.querySelector('svg');
        expect(svg.getAttribute('aria-label')).toBe(name);
      });
    });
  });

  describe('size input', () => {
    it('updates width attribute when size changes', () => {
      fixture.componentRef.setInput('size', 32);
      fixture.detectChanges();
      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg.getAttribute('width')).toBe('32');
    });

    it('updates height attribute when size changes', () => {
      fixture.componentRef.setInput('size', 48);
      fixture.detectChanges();
      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg.getAttribute('height')).toBe('48');
    });

    it('accepts custom size values', () => {
      fixture.componentRef.setInput('size', 16);
      fixture.detectChanges();
      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg.getAttribute('width')).toBe('16');
      expect(svg.getAttribute('height')).toBe('16');
    });
  });

  describe('safeIconPath', () => {
    it('returns truthy value for all icon names', () => {
      iconNames.forEach((name) => {
        component.name = name;
        expect(component.safeIconPath).toBeTruthy();
      });
    });

    it('renders SVG content in the template for all icons', () => {
      iconNames.forEach((name) => {
        component.name = name;
        fixture.detectChanges();
        const svg = fixture.nativeElement.querySelector('svg');
        // The innerHTML should contain the SVG path elements
        expect(svg.innerHTML).toBeTruthy();
      });
    });
  });

  describe('IconName type', () => {
    it('accepts all known icon names', () => {
      const knownIcons: IconName[] = iconNames;
      knownIcons.forEach((icon) => {
        component.name = icon;
        expect(component.name).toBe(icon);
      });
    });
  });

  describe('component properties', () => {
    it('has default name of "x"', () => {
      expect(component.name).toBe('x');
    });

    it('has default size of 24', () => {
      expect(component.size).toBe(24);
    });
  });
});