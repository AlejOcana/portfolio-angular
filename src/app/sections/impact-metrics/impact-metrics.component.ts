import { Component, OnInit, inject } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { ImpactMetric } from '../../core/portfolio.models';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { AnimatedCounterComponent } from '../../shared/components/animated-counter/animated-counter.component';

@Component({
  selector: 'app-impact-metrics',
  standalone: true,
  imports: [ScrollRevealDirective, AnimatedCounterComponent],
  templateUrl: './impact-metrics.component.html',
  styleUrls: ['./impact-metrics.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ImpactMetricsComponent implements OnInit {
  private dataService = inject(PortfolioDataService);

  metrics: ImpactMetric[] = [];

  ngOnInit(): void {
    this.metrics = this.dataService.getImpactMetrics();
  }

  getSuffix(metric: ImpactMetric): string {
    const numVal = metric.numericValue;
    if (numVal === undefined || isNaN(numVal)) {
      return '';
    }
    // Add "+" suffix for values like 10+ that were converted to 10 for animation
    const originalVal = metric.value;
    if (originalVal && originalVal.includes('+')) {
      return '+';
    }
    return '';
  }
}
