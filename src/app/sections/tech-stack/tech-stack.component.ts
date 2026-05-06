import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition, stagger, query } from '@angular/animations';
import { PortfolioDataService } from '../../core/portfolio-data.service';
import { TechStack, TechStackCategory } from '../../core/portfolio.models';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.scss'],
  animations: [
    trigger('staggerIn', [
      transition(':enter', [
        query(
          '.stack-category',
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
export class TechStackComponent implements OnInit {
  private dataService = inject(PortfolioDataService);

  techStack!: TechStack;

  ngOnInit(): void {
    this.techStack = this.dataService.getTechStack();
  }

  get categories(): TechStackCategory[] {
    return [
      this.techStack.primary,
      this.techStack.backend,
      this.techStack.database,
      this.techStack.devops,
      this.techStack.emerging,
    ];
  }
}
