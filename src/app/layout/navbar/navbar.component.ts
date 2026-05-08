import {
  Component,
  signal,
  effect,
  HostListener,
  OnDestroy,
  inject,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  isMenuOpen = signal(false);
  isScrolled = signal(false);

  navLinks: { label: string; href: string; icon: IconName }[] = [
    { label: 'About', href: '#about', icon: 'user' },
    { label: 'Experience', href: '#experience', icon: 'briefcase' },
    { label: 'Projects', href: '#projects', icon: 'folder' },
    { label: 'Tech Stack', href: '#stack', icon: 'cpu' },
  ];

  // --- Focus trap state ---
  private previouslyFocusedElement: HTMLElement | null = null;
  private keydownListener: (() => void) | null = null;

  // --- Swipe-to-close state ---
  private touchStartX = 0;
  private touchStartY = 0;
  private touchStartListener: (() => void) | null = null;
  private touchMoveListener: (() => void) | null = null;
  private touchEndListener: (() => void) | null = null;

  constructor() {
    // Body scroll lock
    effect(() => {
      if (this.isMenuOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Focus trap activation / swipe-to-close activation
    effect(() => {
      if (this.isMenuOpen()) {
        this.activateFocusTrap();
        this.activateSwipeToClose();
      } else {
        this.deactivateFocusTrap();
        this.deactivateSwipeToClose();
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
    // Scroll lock and focus restore are handled by the effects above
  }

  scrollToContact(): void {
    this.closeMenu();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  // ─── Focus Trap ────────────────────────────────────────────────

  private activateFocusTrap(): void {
    // Save currently focused element to restore later
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    // Move focus to the drawer close button after a tick (DOM updated)
    requestAnimationFrame(() => {
      const closeBtn = this.el.nativeElement.querySelector(
        '.drawer-close button'
      ) as HTMLElement | null;
      closeBtn?.focus();
    });

    // Listen for Tab key to cycle focus within the drawer
    this.keydownListener = this.renderer.listen(
      this.el.nativeElement,
      'keydown',
      (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;

        const drawer = this.el.nativeElement.querySelector(
          '.navbar-nav'
        ) as HTMLElement;
        if (!drawer) return;

        const focusable = this.getFocusableElements(drawer);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey) {
          // Shift+Tab: if on first element, wrap to last
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else {
          // Tab: if on last element, wrap to first
          if (document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    );
  }

  private deactivateFocusTrap(): void {
    // Remove keydown listener
    if (this.keydownListener) {
      this.keydownListener();
      this.keydownListener = null;
    }

    // Restore focus to the previously focused element
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }
  }

  private getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll(selector)) as HTMLElement[];
  }

  // ─── Swipe-to-Close ────────────────────────────────────────────

  private activateSwipeToClose(): void {
    const nav = this.el.nativeElement.querySelector(
      '.navbar-nav'
    ) as HTMLElement;
    if (!nav) return;

    this.touchStartListener = this.renderer.listen(
      nav,
      'touchstart',
      (event: TouchEvent) => {
        this.touchStartX = event.touches[0].clientX;
        this.touchStartY = event.touches[0].clientY;
      },
      { passive: true }
    );

    this.touchMoveListener = this.renderer.listen(
      nav,
      'touchmove',
      (event: TouchEvent) => {
        const deltaX = event.touches[0].clientX - this.touchStartX;
        const deltaY = event.touches[0].clientY - this.touchStartY;

        // Only apply transform if horizontal swipe is dominant
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
          // Apply dynamic transform (clamped to drawer width)
          const translateX = Math.max(deltaX, -300);
          nav.style.transform = `translateX(${translateX}px)`;
          nav.style.transition = 'none';
        }
      },
      { passive: true }
    );

    this.touchEndListener = this.renderer.listen(nav, 'touchend', () => {
      const deltaX = this.getLastTouchDeltaX(nav);

      // Reset transform
      nav.style.transform = '';
      nav.style.transition = '';

      // If swipe left exceeded threshold, close menu
      if (deltaX < -80) {
        this.closeMenu();
      }
    });
  }

  private deactivateSwipeToClose(): void {
    if (this.touchStartListener) {
      this.touchStartListener();
      this.touchStartListener = null;
    }
    if (this.touchMoveListener) {
      this.touchMoveListener();
      this.touchMoveListener = null;
    }
    if (this.touchEndListener) {
      this.touchEndListener();
      this.touchEndListener = null;
    }

    // Reset any lingering transform on the nav
    const nav = this.el.nativeElement.querySelector(
      '.navbar-nav'
    ) as HTMLElement;
    if (nav) {
      nav.style.transform = '';
      nav.style.transition = '';
    }
  }

  private getLastTouchDeltaX(nav: HTMLElement): number {
    // Read the current translateX from the inline style
    const transform = nav.style.transform;
    const match = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
    return match ? parseFloat(match[1]) : 0;
  }

  // ─── Cleanup ───────────────────────────────────────────────────

  ngOnDestroy(): void {
    this.deactivateFocusTrap();
    this.deactivateSwipeToClose();

    // Ensure body scroll is unlocked if component is destroyed while menu is open
    document.body.style.overflow = '';
  }
}
