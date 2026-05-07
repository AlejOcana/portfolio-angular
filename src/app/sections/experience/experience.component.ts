import { Component, OnInit, inject } from '@angular/core';
import { trigger, style, animate, transition, stagger, query } from '@angular/animations';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { Experience } from '../../core/portfolio.models';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  animations: [
    trigger('staggerIn', [
      transition(':enter', [
        query(
          '.experience-item',
          [
            style({ opacity: 0, transform: 'translateX(-20px)' }),
            stagger(150, [
              animate('0.5s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class ExperienceComponent implements OnInit {
  private dataService = inject(PortfolioDataService);

  experience: Experience[] = [];

  ngOnInit(): void {
    this.experience = this.dataService.getExperience();
  }
}
