import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Affiliate {
  name: string;
  baseUrl: string;
  active: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  affiliates: Affiliate[];
}

@Component({
  selector: 'app-category-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-cards.component.html',
  styleUrls: ['./category-cards.component.scss']
})
export class CategoryCardsComponent {
  @Input() categories: Category[] = [];

  onCategoryClick(category: Category): void {
    // Redirect to first active affiliate
    const activeAffiliate = category.affiliates.find(a => a.active);
    if (activeAffiliate) {
      window.open(activeAffiliate.baseUrl, '_blank');
    }
  }

  onAffiliateClick(event: Event, affiliateUrl: string): void {
    event.stopPropagation();
    window.open(affiliateUrl, '_blank');
  }
}
