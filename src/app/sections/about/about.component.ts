import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { PersonalInfo } from '../../core/portfolio.models';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  private dataService = inject(PortfolioDataService);

  personalInfo!: PersonalInfo;

  ngOnInit(): void {
    this.personalInfo = this.dataService.getPersonalInfo();
  }

  focusAreas = [
    'Full-Stack Development',
    'Technical Leadership',
    'System Architecture',
    'Team Coordination',
  ];
}
