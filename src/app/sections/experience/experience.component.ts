import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition, stagger, query } from '@angular/animations';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { Experience } from '../../core/portfolio.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  animations: [
    trigger('staggerIn', [
      transition(':enter', [
        query('.experience-item', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(150, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ExperienceComponent implements OnInit {
  experience: Experience[] = [];

  constructor(private dataService: PortfolioDataService) {}

  ngOnInit(): void {
    this.experience = this.dataService.getExperience();
  }
}