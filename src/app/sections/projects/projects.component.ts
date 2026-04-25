import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition, stagger, query } from '@angular/animations';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { Project } from '../../core/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('staggerIn', [
      transition(':enter', [
        query('.project-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(150, [
            animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private dataService: PortfolioDataService) {}

  ngOnInit(): void {
    this.projects = this.dataService.getProjects();
  }
}