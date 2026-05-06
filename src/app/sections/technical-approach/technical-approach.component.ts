import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition, stagger, query } from '@angular/animations';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { TechnicalPrinciple } from '../../core/portfolio.models';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-technical-approach',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './technical-approach.component.html',
  styleUrls: ['./technical-approach.component.scss'],
  animations: [
    trigger('staggerIn', [
      transition(':enter', [
        query(
          '.approach-card',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [
              animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class TechnicalApproachComponent implements OnInit {
  private dataService = inject(PortfolioDataService);

  principles: TechnicalPrinciple[] = [];

  ngOnInit(): void {
    this.principles = this.dataService.getTechnicalApproach();
  }
}
