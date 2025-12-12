import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss']
})
export class HeroBannerComponent {
  quickLinks = [
    { name: 'Hotels', icon: 'hotel', url: '#hotels' },
    { name: 'Flights', icon: 'flight', url: '#flights' },
    { name: 'Health', icon: 'medical_services', url: '#health' },
    { name: 'Insurance', icon: 'security', url: '#insurance' }
  ];

  onQuickLinkClick(url: string): void {
    const element = document.querySelector(url);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToCategories(): void {
    const element = document.querySelector('#categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
