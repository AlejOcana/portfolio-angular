import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
  host: {
    'class': 'animate-fade-up',
  },
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  ngOnInit() {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.el.nativeElement.classList.add('revealed');
      return;
    }

    // Read data attributes
    const animation = this.el.nativeElement.getAttribute('data-animation') || 'fade-up';
    const stagger = parseInt(this.el.nativeElement.getAttribute('data-stagger') || '0', 10);

    // Set animation class
    this.el.nativeElement.classList.remove(
      'animate-fade-up',
      'animate-fade-in',
      'animate-scale-in',
      'animate-slide-left',
      'animate-slide-right'
    );
    this.el.nativeElement.classList.add(`animate-${animation}`);

    if (stagger > 0) {
      this.el.nativeElement.style.transitionDelay = `${stagger * 50}ms`;
    }

    // IntersectionObserver
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
