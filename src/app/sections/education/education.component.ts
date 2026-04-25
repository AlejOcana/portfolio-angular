import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition, stagger, query } from '@angular/animations';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { Education } from '../../core/portfolio.models';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  animations: [
    trigger('staggerIn', [
      transition(':enter', [
        query('.edu-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class EducationComponent implements OnInit {
  education: Education[] = [];
  certifications: string[] = [];

  constructor(private dataService: PortfolioDataService) {}

  ngOnInit(): void {
    this.education = this.dataService.getEducation();
    this.certifications = this.dataService.getCertifications();
  }
}