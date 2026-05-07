import { Component, OnInit, inject } from '@angular/core';
import { trigger, style, animate, transition, stagger, query } from '@angular/animations';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { Project } from '../../core/portfolio.models';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [IconComponent, ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('staggerIn', [
      transition(':enter', [
        query(
          '.project-card',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(150, [
              animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class ProjectsComponent implements OnInit {
  private dataService = inject(PortfolioDataService);

  projects: Project[] = [];

  ngOnInit(): void {
    this.projects = this.dataService.getProjects();
  }
}
