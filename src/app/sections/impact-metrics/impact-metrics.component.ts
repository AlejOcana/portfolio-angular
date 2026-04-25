import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { ImpactMetric } from '../../core/portfolio.models';

@Component({
  selector: 'app-impact-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impact-metrics.component.html',
  styleUrls: ['./impact-metrics.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ImpactMetricsComponent implements OnInit {
  metrics: ImpactMetric[] = [];

  constructor(private dataService: PortfolioDataService) {}

  ngOnInit(): void {
    this.metrics = this.dataService.getImpactMetrics();
  }
}