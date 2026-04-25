import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition, stagger, query } from '@angular/animations';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { TechnicalPrinciple } from '../../core/portfolio.models';

@Component({
  selector: 'app-technical-approach',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technical-approach.component.html',
  styleUrls: ['./technical-approach.component.scss'],
  animations: [
    trigger('staggerIn', [
      transition(':enter', [
        query('.approach-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class TechnicalApproachComponent implements OnInit {
  principles: TechnicalPrinciple[] = [];

  constructor(private dataService: PortfolioDataService) {}

  ngOnInit(): void {
    this.principles = this.dataService.getTechnicalApproach();
  }
}