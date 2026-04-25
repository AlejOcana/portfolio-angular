import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { ImpactMetricsComponent } from './sections/impact-metrics/impact-metrics.component';
import { AboutComponent } from './sections/about/about.component';
import { TechnicalApproachComponent } from './sections/technical-approach/technical-approach.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { EducationComponent } from './sections/education/education.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { TechStackComponent } from './sections/tech-stack/tech-stack.component';
import { ScrollToTopComponent } from './shared/components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    ImpactMetricsComponent,
    AboutComponent,
    TechnicalApproachComponent,
    ExperienceComponent,
    EducationComponent,
    ProjectsComponent,
    TechStackComponent,
    ScrollToTopComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}