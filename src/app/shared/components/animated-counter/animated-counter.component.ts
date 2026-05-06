import { Component, Input, OnInit, OnDestroy, ElementRef, signal, inject } from '@angular/core';

@Component({
  selector: 'app-animated-counter',
  standalone: true,
  template: `{{ displayValue() }}`,
})
export class AnimatedCounterComponent implements OnInit, OnDestroy {
  @Input() target = 0;
  @Input() duration = 1500;
  @Input() suffix = '';
  @Input() prefix = '';
  @Input() explicitSuffix = '';

  displayValue = signal('0');

  private observer?: IntersectionObserver;
  private animationFrame?: number;
  private started = false;

  private el = inject(ElementRef);

  ngOnInit() {
    // Check for non-numeric values - display as-is without animation
    if (isNaN(this.target)) {
      this.displayValue.set(this.prefix + this.target + this.suffix);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const finalSuffix = this.explicitSuffix || this.suffix;
      this.displayValue.set(`${this.prefix}${this.target}${finalSuffix}`);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.started) {
          this.started = true;
          this.animate();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  private animate() {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / this.duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * this.target);
      const finalSuffix = this.explicitSuffix || this.suffix;
      this.displayValue.set(`${this.prefix}${current}${finalSuffix}`);
      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(step);
      } else {
        this.displayValue.set(`${this.prefix}${this.target}${finalSuffix}`);
      }
    };
    this.animationFrame = requestAnimationFrame(step);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }
}