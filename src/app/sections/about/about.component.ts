import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { PersonalInfo } from '../../core/portfolio.models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {
  personalInfo!: PersonalInfo;

  constructor(private dataService: PortfolioDataService) {}

  ngOnInit(): void {
    this.personalInfo = this.dataService.getPersonalInfo();
  }

  focusAreas = [
    'Full-Stack Development',
    'Technical Leadership',
    'System Architecture',
    'Team Coordination'
  ];
}