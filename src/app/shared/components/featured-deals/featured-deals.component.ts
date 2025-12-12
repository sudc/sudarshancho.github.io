import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Deal {
  id: string;
  title: string;
  description: string;
  platform: string;
  discount: string;
  image?: string;
  affiliateUrl: string;
  category: string;
  expiryDate?: string;
}

@Component({
  selector: 'app-featured-deals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-deals.component.html',
  styleUrls: ['./featured-deals.component.scss']
})
export class FeaturedDealsComponent {
  @Input() deals: Deal[] = [];

  onDealClick(deal: Deal): void {
    window.open(deal.affiliateUrl, '_blank');
  }

  getDaysRemaining(expiryDate?: string): number | null {
    if (!expiryDate) return null;
    
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  }
}
