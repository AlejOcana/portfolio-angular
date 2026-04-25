import { Component, Inject, PLATFORM_ID, signal, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, style, animate, transition, stagger, query } from '@angular/animations';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PortfolioDataService } from '../../core/portfolio-data.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerList', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HeroComponent implements OnInit {
  displayedSubtitle = signal('');
  private fullSubtitle = '';
  private _isTyping = signal(true);

  constructor(
    private dataService: PortfolioDataService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.fullSubtitle = this.dataService.getPersonalInfo().subtitle;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.typeSubtitle();
    }
  }

  get personalInfo() {
    return this.dataService.getPersonalInfo();
  }

  get isTyping(): boolean {
    return this._isTyping();
  }

  scrollToProjects(): void {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToContact(): void {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollDown(): void {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private typeSubtitle(): void {
    let index = 0;
    const type = () => {
      if (index <= this.fullSubtitle.length) {
        this.displayedSubtitle.set(this.fullSubtitle.slice(0, index));
        index++;
        setTimeout(type, 30);
      } else {
        this._isTyping.set(false);
      }
    };
    type();
  }
}