import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PortfolioDataService } from '../../core/portfolio-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear: number;

  constructor(
    private dataService: PortfolioDataService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.currentYear = isPlatformBrowser(this.platformId) 
      ? new Date().getFullYear() 
      : new Date().getFullYear();
  }

  get personalInfo() {
    return this.dataService.getPersonalInfo();
  }
}