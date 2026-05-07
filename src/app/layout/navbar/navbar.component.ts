import { Component, signal, HostListener } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen = signal(false);
  isScrolled = signal(false);

  navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Tech Stack', href: '#stack' },
  ];

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
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
}