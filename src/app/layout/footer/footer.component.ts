import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PortfolioDataService } from '../../core/portfolio-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  private dataService = inject(PortfolioDataService);
  private platformId = inject(PLATFORM_ID);

  currentYear: number;

  constructor() {
    this.currentYear = isPlatformBrowser(this.platformId)
      ? new Date().getFullYear()
      : new Date().getFullYear();
  }

  get personalInfo() {
    return this.dataService.getPersonalInfo();
  }
}
